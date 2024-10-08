import { usb, getDeviceList, Device, Capability } from 'usb';
let scanner

usb.on('attach', (device) => {
    console.log('attach', device)
    scanner = device.controlTransfer(0x21, 0x9, 0x100, 0x1000, )
})

// usb.on('detach', (device) => {
//     console.log('detach', device)
//
// })

