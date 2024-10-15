process.stdin.setEncoding('utf8');
process.stdin.on('data', function (data) {
    console.log('Сканированный код:', data.trim());
});