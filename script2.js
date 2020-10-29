const saveAsPDF = document.querySelector(".alert .saveAsPDF");

saveAsPDF.addEventListener("click", (e) => {
    window.print();
    window.close();
})