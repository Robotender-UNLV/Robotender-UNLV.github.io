from flask import Flask, request, jsonify
import RPi.GPIO as GPIO
import time

app = Flask(__name__)
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(17, GPIO.OUT)
GPIO.setup(27, GPIO.OUT)
GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)



@app.route('/', methods=['GET'])
def robo():

    pump1 = request.args.get('pump1')
    pump2 = request.args.get('pump2')
    pump3 = request.args.get('pump3')
    pump4 = request.args.get('pump4')

    pump_time = []
    pump_time.extend([int(pump1), int(pump2), int(pump3), int(pump4)])

    sort_time = []
    for i in range(4):
        sort_time.append(pump_time[i])
    #sort_time.sort()
    gpio_num = [17, 27, 23, 24]
 # We set swapped to True so the loop looks runs at least once
    swapped = True
    while swapped:
        swapped = False
        for i in range(len(sort_time) - 1):
            if sort_time[i] > sort_time[i + 1]:
                # Swap the elements
                sort_time[i], sort_time[i + 1] = sort_time[i + 1], sort_time[i]
                gpio_num[i], gpio_num[i + 1] = gpio_num[i + 1], gpio_num[i]
                # Set the flag to True so we'll loop again
                swapped = True
 
    
    # listToStr = ' '.join([str(elem) for elem in gpio_num])
    # return jsonify({"message": listToStr})
    
    
    #checks which pump is which in the sort
    # for i in range(4):
    #     for j in range(4):
    #         if sort_time[i] == pump_time[j]:
    #             gpio_num.insert(i, j+8)
    start = time.time()
    while (time.time() - start) < sort_time[3]:
        GPIO.output(gpio_num[0], GPIO.HIGH)
        GPIO.output(gpio_num[1], GPIO.HIGH)
        GPIO.output(gpio_num[2], GPIO.HIGH)
        GPIO.output(gpio_num[3], GPIO.HIGH)
        time.sleep(sort_time[0])
        GPIO.output(gpio_num[0], GPIO.LOW)
        time.sleep(sort_time[1]-sort_time[0])
        GPIO.output(gpio_num[1], GPIO.LOW)
        time.sleep(sort_time[2]-sort_time[1])
        GPIO.output(gpio_num[2], GPIO.LOW)
        time.sleep(sort_time[3] - sort_time[2])
        GPIO.output(gpio_num[3], GPIO.LOW)

    
    



    # if pump_time[0] != "0":
    #     start = time.time()
    #     while (time.time()-start) < pump_time[0]:
    #         GPIO.output(14, GPIO.HIGH)
    #     GPIO.output(14,GPIO.LOW)
    
    # if pump_time[1] != "0":
    #     start = time.time()
    #     while (time.time()-start) < pump_time[1]:
    #         GPIO.output(15, GPIO.HIGH)
    #     GPIO.output(15, GPIO.LOW)
    
    # if pump_time[2] != "0":
    #     start = time.time()
    #     while (time.time() - start) < pump_time[2]:
    #         GPIO.output(17, GPIO.HIGH)
    #     GPIO.output(17, GPIO.LOW)

    # if pump_time[3] != "0":
    #     start = time.time()
    #     while (time.time() - start) < pump_time[3]:
    #         GPIO.output(18, GPIO.HIGH)
    #     GPIO.output(18, GPIO.LOW)

          
    
    
    


    return jsonify({"message": "Pumps off"})

