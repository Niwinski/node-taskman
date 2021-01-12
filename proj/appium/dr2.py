# importing the requests library
import requests
import json
import time
import random
import base64


def do_double_click(a, x, y):
    print("double at {},{}".format(x, y))
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
        "duration": 150,
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


def double_click(p):
    actions = get_header()
    aa = actions['actions'][0]['actions']
    do_double_click(aa, p[0], p[1])
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

# api-endpoint
# sid = "1788b87f-b3d2-44ef-b330-314d399eba8d"
URL = "http://127.0.0.1:4723/wd/hub/session/{}/actions".format(sid)

URL2 = "http://127.0.0.1:4723/wd/hub/session/{}/screenshot".format(sid)

activittURL = "http://127.0.0.1:4723/wd/hub/session/{}/appium/device/current_activity".format(
    sid)

# r = requests.get(url=URL2, headers=newHeaders)
# print(r.json())
# print(r.content)

# f = open("img.jpg", "wb")
# f.write(base64.b64decode(r.content))
# f.close()
# exit(0)


# exit(0)
box = [[750, 900],
       [1750, 1200]
       ]


def center_drag():
    midX = int(box[0][0] + box[1][0])/2
    midY = int(box[0][1] + box[1][1])/2
    drag(box[0][0], box[0][1], midX, midY)
    drag(box[0][0], box[1][1], midX, midY)
    drag(box[1][0], box[0][1], midX, midY)
    drag(box[1][0], box[1][1], midX, midY)

    time.sleep(1)


def random_drag():

    x1 = random.randrange(box[0][0], box[1][0])
    y1 = random.randrange(box[0][1], box[1][1])
    x2 = random.randrange(box[0][0], box[1][0])
    y2 = random.randrange(box[0][1], box[1][1])
    print("drag ", x1, y1, " to ", x2, y2)
    drag(x1, y1, x2, y2)
    time.sleep(1)


def line_drag(start, dx, dy, vert, num):

    for i in range(num):
        nx = start[0]+(i*dx)
        ny = start[1]+(i*dy)
        drag(nx, ny, start[0], ny+(vert[1]*3))
    time.sleep(1)


x = 0
start = [660, 450]
amount = 3
dx = 340
dy = -100
i = 0
# linear
if False:
    secondsToWait = 7
    while True:
        print("loop...")
        if x % secondsToWait == 0:
            target = [0, 0]
            target[0] = start[0] + dx*(i % amount)
            target[1] = start[1] + dy*(i % amount)
            double_click(target)
            i += 1
            # random_drag()
            # random_drag()
            # random_drag()
            # random_drag()
        time.sleep(1)
        x += 1

# points

dx = (1782 - 319)/4
dy = (629 - 946)/4
x = 475
y = 748

# pixels between one row and another
vert_squares = 6
vert_d = [(1327 - 870)/vert_squares,   (1383 - 829)/vert_squares]

drag_start = [967, 1084]
drag_start1 = drag_start
drag_start1[0] += vert_d[0]
drag_start1[1] += vert_d[1]

points = []

for i in range(6):
    points.append([x+(dx*i), y+(dy*i)])
# points.append([points[1][0]+(points[1][0]-points[0][0]),
#               points[1][1]+(points[1][1]-points[0][1])])
# points.append([points[0][0]-(points[1][0]-points[0][0]),
#               points[0][1]-(points[1][1]-points[0][1])])
if True:
    secondsToWait = 1
    while True:
        print("loop..." + str(x))
        if x % secondsToWait == 0:
            for point in points:
                double_click(point)
            line_drag(drag_start, dx/2, dy, vert_d, 6)
            for i in range(5):
                random_drag()
            line_drag(drag_start, dx/2, dy, vert_d, 6)
            line_drag(drag_start1, dx/2, dy, vert_d, 6)
        time.sleep(1)
        x += 1

        # make sure we're still playing dragons, if we accidentaly lose focus thorugh notifications stop.
        r = requests.get(url=activittURL).json()
        if (r['value'] != "com.gramgames.activity.UnityPlayerActivity"):
            exit(1)
        # print(activittURL)
        # print(r)

        # center_drag()
        # random_drag()

        # if x % 8 == 1:
        #    double_click([620, 1300])

# twin flowers = 2 for 3 flowers
# purple flowers = 6
secondsToWait = 2
i = 0
x = 0
while True:
    print("loop..." + str(i))
    if i % secondsToWait == 0:
        double_click(points[x % (len(points))])
        x += 1
    i += 1
    time.sleep(1)
    # random_drag()


# print (actions)
# sending get request and saving the response as response object6
