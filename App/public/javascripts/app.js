const publicVapidKey = 'BGrZ_Y60uwSrh-Zrf_FjIBfw5kvB2ziYs6i5pgKY5iw8E601jdeePi6QHByuXB94YbLf4MxHPCS7_o_j7TtknU0';

if ('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}


async function send() {
    console.log('Register service worker');
    const register = await navigator.serviceWorker.register('/serviceWorker.js');
    console.log('Service Worker registered');

    console.log('Registering Push..');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}