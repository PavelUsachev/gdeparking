import os
import json
import time
from datetime import datetime
from dotenv import load_dotenv

import threading

import cv2
import numpy as np
from PIL import Image
from moviepy.video.io.VideoFileClip import VideoFileClip

import requests
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


def driver_init():
    desired_capabilities = DesiredCapabilities.CHROME
    desired_capabilities["goog:loggingPrefs"] = {"performance": "ALL"}

    options = webdriver.ChromeOptions()

    options.add_argument("--no-sandbox")
    options.add_argument("--headless")
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument("start-maximized")
    options.add_argument("--autoplay-policy=no-user-gesture-required")
    options.add_argument("disable-infobars")
    options.add_argument("--disable-extensions")
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--mute-audio")
    options.add_argument("--disable-notifications")
    options.add_argument("--disable-popup-blocking")
    options.add_argument(f'user-agent={desired_capabilities}')

    driver = webdriver.Chrome(options=options,
                              desired_capabilities=desired_capabilities)
    return driver


def get_video(driver_, cam_url, c_id, ts):
    driver_.get(cam_url)
    driver_.execute_script("window.scrollTo(0, 10000)")
    time.sleep(ts)
    logs = driver_.get_log("performance")
    url_list = []

    for log in logs:
        network_log = json.loads(log["message"])["message"]
        try:
            if ("Network.response" in network_log["method"]
                or "Network.request" in network_log["method"]
                or "Network.webSocket" in network_log["method"]) \
                    and ((".mp4" in network_log["params"]["request"]["url"])
                         or (".ts" in network_log["params"]["request"]["url"])):
                url_list.append(network_log["params"]["request"]["url"])
        except:
            pass

    if len(url_list) > 0:
        current_datetime = datetime.now()
        video_data = requests.get(url_list[-1])
        with open(f"./temp/tmp_{c_id}.mp4", "wb") as file:
            file.write(video_data.content)
        return str(current_datetime).split(".")[0]
    return None


def image_zone_preprocessing(zone_img_data):
    image = Image.fromarray(zone_img_data)
    image = image.resize((128, 128))
    image = np.array(image)
    image = image.transpose((2, 0, 1)).astype(np.float32)
    image /= 255
    image = image[None, ...]
    return image


def park_place_detection(driver_, cam_url, camera_id, net, park_zones, t_sleep):
    pred_data = []
    connect_time_status = get_video(driver_, cam_url, camera_id, t_sleep)
    if connect_time_status is not None:
        try:
            clip = VideoFileClip(f"./temp/tmp_{camera_id}.mp4")
            last_frame = clip.get_frame(clip.duration - 1)[:, :, ::-1]
            for zone in park_zones:
                x, y, w, h = zone["x"], zone["y"], zone["w"], zone["h"]
                img_zone = last_frame[int(y - h / 2):int(y + h / 2), int(x - w / 2):int(x + w / 2)]
                blob = image_zone_preprocessing(img_zone)
                net.setInput(blob)
                output = net.forward()[0].reshape(2, 1)
                predict = np.argmax(output)
                pred_data.append((zone["name"], int(predict)))
        except:
            connect_time_status = None
    return pred_data, connect_time_status


def one_cam_threading(cam_nb, server_address):

    with open(f"./devices_metadata/{cam_nb}_metadata.txt", "r") as f:
        data = f.read()
    metadata = json.loads(data)

    detection = True
    last_prediction = None
    last_connection_time = None

    url = metadata["cam_url"]
    zones = metadata["detect_zones"]
    sleep_time = metadata["update_period"] // 2 + 1

    model_path = "./cv_model/parking_detect.onnx"
    model = cv2.dnn.readNetFromONNX(model_path)

    web_driver = driver_init()

    while detection:
        prediction, connection_time = park_place_detection(web_driver, url, cam_nb, model, zones, sleep_time)

        if last_connection_time is None and connection_time is not None:
            print(f"Connected to the camera {cam_nb.split('_')[-1]} successfully!")
            last_prediction = dict(prediction)
            last_connection_time = connection_time
        elif connection_time is None:
            print(f"Camera {cam_nb.split('_')[-1]} connection error! The next attempt will be made in a few seconds...")
        else:
            last_prediction = dict(prediction)
            last_connection_time = connection_time

        detection_result = {"detection_result": last_prediction,
                            "last_connection": last_connection_time,
                            "metadata": {"cam_id": cam_nb,
                                         "cam_address": metadata["cam_address"],
                                         "park_places_nb": len(zones),
                                         "timezone": metadata["timezone"],
                                         "update_period": metadata["update_period"]}}
        if server_address is not None:
            package = requests.post(server_address, json=detection_result)
            if package.status_code != 200:
                print(f"Failed to send {cam_nb} data package!")
        else:
            print(f"Camera {cam_nb.split('_')[-1]}:\nlast_connection: {last_connection_time}\ndetection_result:"
                  f" {last_prediction}")

    web_driver.quit()


if __name__ == "__main__":

    print("Service starts...")

    load_dotenv()
    api_url = os.getenv("API_URL")

    if api_url is None:
        print(f"No server address for send detection results! Check the .env file in the project directory. The "
              f"results of the detection will be redirected to standard output.")

    threads = []
    for _, _, files in os.walk("./devices_metadata"):
        for filename in files:
            cam_id = '_'.join(filename.split('_')[:2])
            t = threading.Thread(target=one_cam_threading, args=(cam_id, api_url,))
            t.start()
            threads.append(t)
            print(f"Thread-{cam_id.split('_')[-1].split('0')[-1]} started.")

    for t in threads:
        t.join()
