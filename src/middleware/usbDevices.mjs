import {stdin, stdout} from 'node:process';

stdin.on('data', data => {
    stdout.pipe(data)
})


// import HID from 'node-hid';
//
// const [barcodeScanner, ...rest] = [...await HID.devicesAsync()]
//     .filter(device => device.product.includes('Symbol Bar'))
// console.log(barcodeScanner)
// const device = await HID.HIDAsync.open(barcodeScanner.path)
// device.on('data', data => console.log(data))