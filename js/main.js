document.addEventListener('DOMContentLoaded', () => {
    /**
         * @type {ListRenderer}
         **/
    let list = document.getElementById('list');
    if (list) {
        list.setItems(blogData);
    }
   
    document.getElementById('changeDark').addEventListener('click', () => {
        const htmlElement = document.documentElement;
        if (htmlElement.style.colorScheme === 'dark') {
            htmlElement.style.colorScheme = 'light';
            htmlElement.style.backgroundImage = 'url("https://s3.bmp.ovh/imgs/2024/11/19/ada2bb34996f9005.jpg")';
        } else {
            htmlElement.style.colorScheme = 'dark';
            htmlElement.style.backgroundImage = 'url("https://s3.bmp.ovh/imgs/2025/03/10/fa5133e0283e0f8d.jpg")';
        }
    });
    document.getElementsByClassName('link')[0].addEventListener('click', () => {
        window.location.href = '/index.html';
    });
})
