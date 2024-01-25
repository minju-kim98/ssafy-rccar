from sense_hat import SenseHat

def lv1():
    global pixels
    pixels = [
        b, b, b, b, b, b, b, b,
        b, b, b, b, b, f, b, b,
        b, b, f, b, b, f, b, b,
        b, b, f, b, b, b, b, b,
        b, b, f, b, b, b, b, b,
        b, b, f, b, b, f, b, b,
        b, b, b, b, b, f, b, b,
        b, b, b, b, b, b, b, b
    ]

def lv2():
    global pixels
    pixels = [
        b, b, b, b, b, b, b, b,
        b, b, b, f, b, b, f, b,
        b, b, f, b, b, b, f, b,
        b, f, b, b, b, b, b, b,
        b, f, b, b, b, b, b, b,
        b, b, f, b, b, b, f, b,
        b, b, b, f, b, b, f, b,
        b, b, b, b, b, b, b, b
    ]

def lv3():
    global pixels
    pixels = [
        b, b, b, b, b, b, b, b,
        b, b, b, f, b, b, b, b,
        b, b, f, b, b, f, f, b,
        b, f, b, b, b, b, b, b,
        b, f, b, b, b, b, b, b,
        b, b, f, b, b, f, f, b,
        b, b, b, f, b, b, b, b,
        b, b, b, b, b, b, b, b
    ]

def lv4():
    global pixels
    pixels = [
        b, b, b, b, b, f, b, b,
        b, b, b, f, b, b, f, b,
        b, b, f, b, b, f, b, b,
        b, f, b, b, b, b, b, b,
        b, f, b, b, b, b, b, b,
        b, b, f, b, b, f, b, b,
        b, b, b, f, b, b, f, b,
        b, b, b, b, b, f, b, b
    ]

def lv5():
    global pixels
    pixels = [
        b, b, b, f, f, b, b, b,
        b, b, f, b, b, f, b, b,
        b, f, b, b, b, b, f, b,
        f, b, b, b, b, f, b, b,
        f, b, b, b, b, f, b, b,
        b, f, b, b, b, b, f, b,
        b, b, f, b, b, f, b, b,
        b, b, b, f, f, b, b, b
    ]

sense = SenseHat()

b = (0,0,0)
f = (255,255,255)
pixels = []

lv1()

sense.set_pixels(pixels)