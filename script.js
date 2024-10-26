document.getElementById('salaaform').addEventListener('submit', function(e) {
    e.preventDefault();

    // Variables des matériaux
    let simma = parseFloat(document.getElementById('simma').value) || 0;
    let hdid = parseFloat(document.getElementById('hdid').value) || 0;
    let ramla = parseFloat(document.getElementById('ramla').value) || 0;
    let kayas = parseFloat(document.getElementById('kayas').value) || 0;
    let hjar = parseFloat(document.getElementById('hjar').value) || 0;
    let toufna = parseFloat(document.getElementById('toufna').value) || 0;

    // Variables de la tabla
    let tol = parseFloat(document.getElementById('tol').value) || 0;
    let eard = parseFloat(document.getElementById('eard').value) || 0;
    let type3mara = document.getElementById('3mara').value;

    let surface = tol*eard;
    let coefficient, simaplus;

    switch(type3mara) {
        case "tofna":
            coefficient = 0.009*toufna;
            simaplus = 0;
            break;
        case "chabka":
            coefficient = 2.5*hdid;
            simaplus = 0.009;
            break;
        case "blokaj":
            coefficient = 13.63;
            simaplus = 0.009;
            break;
    }

    let tabla = (coefficient+simaplus*20*simma+13.63+0.91*simma)*surface+1.5*(tol*2+eard*2)*(23.8*hdid+0.21*hjar+0.2*ramla+0.032*kayas);

    document.getElementById('tabla').textContent = tabla.toFixed(2);
});

// Écouteur d'événements pour le bouton de génération du PDF
document.getElementById('generatePDF').addEventListener('click', function() {
    console.log("Bouton PDF cliqué!");  // Cette ligne est pour le débogage

    let total = document.getElementById('tabla').textContent; 
    generatePDF(tabla);
});

function generatePDF(total) {
    try {
        const docDefinition = {
            content: [
                { text: 'Récapitulatif des coûts de construction', fontSize: 18, bold: true, alignment: 'center' },
                {
                    table: {
                        widths: ['*', '*'],
                        body: [
                            ['Matériau', 'Prix (en dirhams)'],
                            ['Misaha', document.getElementById('misaha').value + ' dirhams'],
                        ]
                    }
                }
            ], 
        };
        
        pdfMake.createPdf(docDefinition).download('recapitulatif.pdf');
    } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
    }
}