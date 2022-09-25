import socket
import os 


def startSamOnLocalNetwork():
    '''
    Starts `sam local start-api` and inserts your machines ip address 
    so you can call the server from your local network!
    ''' 
    try:
        host_name = socket.gethostname()
        host_ip = socket.gethostbyname(host_name)
        os.system(f"sam local start-api --host '{host_ip}'")
    except:
        print("Unable to get Hostname and IP")
 
 
# Driver code
startSamOnLocalNetwork()