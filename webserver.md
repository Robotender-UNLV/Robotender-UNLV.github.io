# Setting up the PI
Please run the following
```sudo apt update && sudo apt upgrade -y```
``` sudo apt install apache2 -y```

The default directory is 
```cd /var/www/html```

to check status 
```service apache2 status```

to start 
```sudo service apache2 start```

to stop
```sudo service apache2 stop```
to restart
```sudo service apache2 restart```

# Setting up the Virtual Enviorment

Please run the following commands

```sudo apt install python3-venv```

navigate to directory 
```cd /var/www/html```
```sudo mkdir robotenderApp```
```sudo python3 -m venv venv```
```. venv/bin/activate```

```sudo chown -R pi:pi venv```
```pip install flask```
``if problems, then deactivate``
