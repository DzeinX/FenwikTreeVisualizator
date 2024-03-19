class DescriptionComponent {
    static createDescription(descriptionText) {
        let descriptionBox = document.createElement("div");
        descriptionBox.setAttribute("class", "description-box");

        let description = document.createElement("div");
        description.setAttribute("class", "description");
        description.innerHTML = descriptionText;

        descriptionBox.appendChild(description);

        return descriptionBox;
    }
}

export default DescriptionComponent;