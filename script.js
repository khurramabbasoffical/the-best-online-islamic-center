const words = [
"Learn Quran Online",
"Learn Tajweed Online",
"Learn Islamic Studies Online",
"Learn Quran Translation"
];

let i = 0;
const typingElement = document.getElementById("typing");

function changeText(){
typingElement.style.opacity = 0;

setTimeout(() => {
typingElement.textContent = words[i];
typingElement.style.opacity = 1;

i++;
if(i >= words.length){
i = 0;
}
}, 300);
}

changeText();
setInterval(changeText, 2000);