# Android environment
import unittest
from appium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.touch_actions import TouchActions
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.remote.command import Command

from selenium.webdriver.common.actions.action_builder import ActionBuilder
import requests


desired_caps = dict(
    platformName='Android',
    # platformVersion='10',
    automationName='UiAutomator2',
    noReset=True
)

# --------------------------------------------------------------------------------------
print('Close active sessions')

all_sessions = "http://127.0.0.1:4723/wd/hub/sessions"
delete_session = "http://127.0.0.1:4723/wd/hub/session/"
newHeaders = {'Content-type': 'application/json', 'Accept': 'text/plain'}

r = requests.get(url=all_sessions, headers=newHeaders)
d = r.json()
for i in d["value"]:
    print('deleting ' + i['id'])
    requests.delete(url=delete_session+i['id'], headers=newHeaders)


# --------------------------------------------------------------------------------------
print("start driver!")

driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

# --------------------------------------------------------------------------------------
print("init!")


root = driver.find_element_by_class_name("android.view.View")
#root = driver.find_element_by_class_name("android.widget.LinearLayout")


root.screenshot('foo.png')
xx = 700
yy = 400
while True:
    print(driver.session_id)

    print("double click! {xx},{yy}", xx, yy)

    obj = driver.find_element_by_class_name("android.view.View")

    if False:

        driver.execute(Command.MOVE_TO, {
                       'xoffset': int(1575), 'yoffset': int(544)})
        print("2double click!")

        driver.execute(Command.CLICK, {'button': 0})
        print("3double click!")

    if False:
        x = 1467 - 1536
        y = 694 - 720
        actions = ActionChains(driver)
        actions.move_to_element(root)  # .pause(.5).double_click()
        actions.move_by_offset(xx, yy)
        # xx+=200
        # yy+=100
        actions.click()
        actions.pause(.25)
#        actions.move_by_offset(5,5)
        actions.click()
        actions.pause(.15)
        # actions.move_by_offset(-5,-5)
        actions.click()
        actions.perform()

    if False:
        #actions = ActionChains(driver)
        if _driver.w3c:
            w3c_actions = ActionBuilder(driver)
        # actions.move_to_element_with_offset(root,1414+1356,700+720) #.pause(.5).double_click()
        # actions.click()
        w3c_actions.pointer_action.move_to(root, 1575+1356, 544+720)
        w3c_actions.key_action.pause(.200)

        w3c_actions.pointer_action.pointer_down()
        w3c_actions.pointer_action.pause(.150)
        w3c_actions.pointer_action.pointer_up()
        # w3c_actions.pointer_action.pause(.050)
        # actions.perform()
        w3c_actions.perform()

    time.sleep(10)


#el = driver.find_element_by_accessibility_id('item')
# el.click()
