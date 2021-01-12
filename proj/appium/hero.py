# importing the requests library
import requests
import json
import time
import random


def do_double_click(a, x, y):
    a.append({
        "type": "pointerMove",
        "duration": 50,
        "x": x,
        "y": y,
        "origin": "viewport"
    })
    a.append({
        "type": "pointerDown",
        "duration": 0,
        "button": 0
    })
    a.append({
        "type": "pause",
        "duration": 50
    })
    a.append({
        "type": "pointerUp",
        "duration": 0,
        "button": 0
    })
    a.append({
        "type": "pause",
        "duration": 50
    })
    a.append({
        "type": "pointerDown",
        "duration": 0,
        "button": 0
    })
    a.append({
        "type": "pause",
        "duration": 50
    })
    a.append({
        "type": "pointerUp",
        "duration": 0,
        "button": 0
    })


def do_click(a, x, y):
    a.append({
        "type": "pointerMove",
        "duration": 50,
        "x": x,
        "y": y,
        "origin": "viewport"
    })
    a.append({
        "type": "pointerDown",
        "duration": 0,
        "button": 0
    })
    a.append({
        "type": "pause",
        "duration": 50
    })
    a.append({
        "type": "pointerUp",
        "duration": 0,
        "button": 0
    })


def do_drag(a, x, y, tx, ty):
    a.append({
        "type": "pointerMove",
        "duration": 50,
        "x": x,
        "y": y,
        "origin": "viewport"
    })
    a.append({
        "type": "pointerDown",
        "duration": 0,
        "button": 0
    })
    a.append({
        "type": "pause",
        "duration": 2
    })
    a.append({
        "type": "pointerMove",
        "duration": 250,
        "x": tx,
        "y": ty,
        "origin": "viewport"
    })
    a.append({
        "type": "pointerUp",
        "duration": 0,
        "button": 0
    })
    a.append({
        "type": "pause",
        "duration": 50
    })


def pause(a):
    a.append({
        "type": "pause",
        "duration": 100
    })


newHeaders = {'Content-type': 'application/json', 'Accept': 'text/plain'}


def get_header():
    actions = {}
    actions['actions'] = [{}]
    actions['actions'][0]['type'] = "pointer"
    actions['actions'][0]['parameters'] = {"pointerType": "touch"}
    actions['actions'][0]['id'] = "touch"
    actions['actions'][0]['actions'] = []
    return actions


def click(x, y):
    actions = get_header()
    aa = actions['actions'][0]['actions']
    do_click(aa, x, y)
    pause(aa)
    r = requests.post(url=URL, json=actions, headers=newHeaders)
    print(r.json())


def double_click(x, y):
    actions = get_header()
    aa = actions['actions'][0]['actions']
    do_double_click(aa, x, y)
    pause(aa)
    r = requests.post(url=URL, json=actions, headers=newHeaders)
    print(r.json())


def drag(x, y, tx, ty):
    actions = get_header()
    aa = actions['actions'][0]['actions']
    do_drag(aa, x, y, tx, ty)
    pause(aa)
    r = requests.post(url=URL, json=actions, headers=newHeaders)
    print(r.json())


all_sessions = "http://127.0.0.1:4723/wd/hub/sessions"
r = requests.get(url=all_sessions, headers=newHeaders)
d = r.json()
for i in d["value"]:
    sid = i['id']
    print('setting session id to  ' + sid)


URL = "http://127.0.0.1:4723/wd/hub/session/{}/actions".format(sid)
print(URL)

# URL2 = "http://127.0.0.1:4723/wd/hub/sessions"

# r = requests.get(url=URL2, headers=newHeaders)
# print(r.json())

while True:
    print("loop...")

    # main village
    click(725, 2680)
    time.sleep(1)

    click(1200, 245)
    time.sleep(5)

    click(1270, 1000)
    time.sleep(1)
    click(1270, 1900)
    time.sleep(2)
    click(1270, 1900)
    time.sleep(20)

#print (actions)
# sending get request and saving the response as response object
