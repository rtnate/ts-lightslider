console.log("Hellow world.");

let test = document.querySelectorAll('#hello_test');

if (test.length > 0) 
{
    test.item(0).innerHTML = 'Hello World!';
}