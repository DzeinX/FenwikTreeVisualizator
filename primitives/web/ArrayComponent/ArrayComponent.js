class ArrayComponent {
    static createArray(highlight, source, titleText) {
        let arrayBox = document.createElement("div");
        arrayBox.setAttribute("class", "array-box");

        let arrayTitle = document.createElement("div");
        arrayTitle.setAttribute("class", "array-title");
        arrayTitle.innerText = titleText;

        let array = document.createElement("div");
        array.setAttribute("class", "array");

        for (let i = 0; i < source.length; i++) {
            let arrayElement = document.createElement("div");

            arrayElement.setAttribute("class", "array-element" + ((highlight[i] === 1) ? " highlight" : ""));

            let arrayElementText = document.createElement("div");
            arrayElementText.setAttribute("class", "array-element__text");
            arrayElementText.innerText = source[i];

            let arrayElementIndex = document.createElement("div");
            arrayElementIndex.setAttribute("class", "array-element__index");
            arrayElementIndex.innerText = i + "";

            arrayElement.appendChild(arrayElementText);
            arrayElement.appendChild(arrayElementIndex);

            array.appendChild(arrayElement);
        }

        arrayBox.appendChild(arrayTitle);
        arrayBox.appendChild(array);

        return arrayBox;
    }
}

export default ArrayComponent;