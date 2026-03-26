// References
let gallery = document.getElementById("pics");
let favorites = document.getElementById("favorites");
let actions = document.getElementById("actions");


let feedback = document.createElement("p");
gallery.parentElement.insertBefore(feedback, gallery.nextSibling);

let counter = document.createElement("p");
gallery.parentElement.insertBefore(counter, feedback.nextSibling);

// Track selection
let selectionCount = 0;
let images = document.querySelectorAll("#pics img");
let totalImages = images.length;

// Store original order for reverting
images.forEach((img, index) => {
    img.dataset.originalIndex = index;
    img.dataset.selected = "false"; // initially not selected
});

// Style containers
[gallery, favorites].forEach(container => {
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "10px";
});
favorites.style.minHeight = "130px";
favorites.style.border = "1px solid #ccc";
favorites.style.padding = "5px";
favorites.style.borderRadius = "5px";
favorites.style.marginTop = "10px";

// Style feedback & counter
[feedback, counter].forEach(p => {
    p.style.fontWeight = "bold";
    p.style.marginTop = "5px";
});
feedback.style.color = "#2c3e50";
counter.style.color = "#1a5276";

// Style actions
actions.style.marginTop = "10px";
actions.style.paddingLeft = "20px";

// Initialize images
images.forEach(img => {
    img.title = img.alt; // Tooltip
    img.style.width = "150px";
    img.style.height = "150px";
    img.style.objectFit = "cover";
    img.style.margin = "5px";
    img.style.transition = "transform 0.3s, border 0.3s";
    img.style.cursor = "pointer";

    // Hover effect
    img.addEventListener("mouseover", () => img.style.transform = "scale(1.05)");
    img.addEventListener("mouseout", () => img.style.transform = "scale(1)");

    // Click event
    img.addEventListener("click", function() {
        // Move to favorites
        if (img.dataset.selected === "false") {
            favorites.appendChild(img);
            img.dataset.selected = "true";
            selectionCount++;

            img.style.border = "3px solid green";
            img.style.borderRadius = "5px";
            img.style.opacity = "0.6";

            // Feedback
            feedback.textContent = `Image selected as favorite #${selectionCount}`;

            // Log action
            let li = document.createElement("li");
            li.textContent = `Moved ${img.src} to favorites`;
            actions.appendChild(li);

        } 
        // Revert back to original position
        else if (img.dataset.selected === "true") {
            let originalIndex = parseInt(img.dataset.originalIndex);
            let galleryChildren = Array.from(gallery.children);

            // Find correct insertion index accounting for images still in gallery
            let inserted = false;
            for (let i = 0; i < galleryChildren.length; i++) {
                if (parseInt(galleryChildren[i].dataset.originalIndex) > originalIndex) {
                    gallery.insertBefore(img, galleryChildren[i]);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) gallery.appendChild(img);

            img.dataset.selected = "false";
            selectionCount--;

            // Remove highlight
            img.style.border = "none";
            img.style.opacity = "1";

            // Feedback
            feedback.textContent = `Image reverted back to the main list`;

            // Log revert
            let li = document.createElement("li");
            li.textContent = `Reverted ${img.src} back to the main list`;
            actions.appendChild(li);
        }

        // Update remaining counter
        let remaining = totalImages - selectionCount;
        counter.textContent = `Remaining images to select: ${remaining}`;

        // Final message if all selected
        if (remaining === 0) feedback.textContent = "All images have been selected!";
    });
});