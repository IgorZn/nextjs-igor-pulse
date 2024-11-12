// import {stdin, stdout} from 'node:process';
//
// stdin.on('data', data => {
//     stdout.pipe(data)
// })

import HID from 'node-hid'

// const [barcodeScanner, ...rest] = [...await HID.devicesAsync()]
//     .filter(device => device.product.includes('Symbol Bar'))
// console.log(barcodeScanner)
// const device = await HID.HIDAsync.open(barcodeScanner.path)
// device.on('data', data => console.log(data))

async function main() {
	try {
		const devices = await HID.devicesAsync()
		console.log('Доступные устройства:', devices)

		const [barcodeScanner, ...rest] = devices.filter(device =>
			device.product.includes('Symbol Bar'),
		)

		if(!barcodeScanner){
			console.error('Сканер штрих-кодов не найден.')
			return
		}

		console.log('Используемое устройство:', barcodeScanner)

		const device = await HID.HIDAsync.open(barcodeScanner.path)
		device.on('data', data => {
			console.log('Данные сканирования:', data)
		})

		device.on('error', error => {
			console.error('Ошибка устройства:', error)
		})
	} catch (error) {
		console.error('Произошла ошибка:', error)
	}
}

main()
