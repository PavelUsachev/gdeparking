from datetime import datetime

FORMAT = '%Y-%m-%d %H:%M:%S'


def input_to_model_converter(data):
    date = datetime.strptime(data['last_connection'], FORMAT)
    new_obj = dict()
    new_obj['id'] = data['metadata']['cam_id']
    new_obj['address'] = data['metadata']['cam_address']
    new_obj['parking_places'] = data['metadata']['park_places_nb']
    new_obj['timezone'] = data['metadata']['timezone']
    new_obj['update_period'] = data['metadata']['update_period']
    new_obj['last_connection'] = date
    return new_obj
