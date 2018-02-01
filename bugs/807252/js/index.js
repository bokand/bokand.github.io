window.addEventListener("click", () => {
    const testSubject = document.getElementById("test-subject");
    const stylePosition = testSubject.style.position;
    testSubject.style.position = stylePosition === "fixed" ? "static" : "fixed";
});
