## Basic http switch for HomeBridge


example HomeBridge `config.json`

```
    {
        "accessory": "NurielDenemeSwitch",
        "name": "Nuriel Deneme Switch",
        "getStatusUrl": "http://localhost:3000/status",
        "setStatusUrl": "http://localhost:3000/switch"
    }
```



In order to work this plugin, you need to install a basic RESTful API to device for communicating this plugin.



[npm link] (https://www.npmjs.com/package/homebridge-nuriel-deneme-switch)