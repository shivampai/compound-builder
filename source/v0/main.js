const BOND_DIR = ['single', 'double', 'triple', 'coord']
bGrid = {
    elem_width: 75,
    bond_width: 25,
    // add_btn_width:25,
    getGridCoord(type, x, y) {

    },
    getSVGCoord(type, col, row, orientation = 'v') {
        //0 - elem ; 1 - bond
        if (type == 0) {
            const x = col * (bGrid.elem_width + bGrid.bond_width)
            const y = row * (bGrid.elem_width + bGrid.bond_width)
            return { left_x: x, top_y: y, right_x: x + bGrid.elem_width, bottom_y: y + bGrid.elem_width, center_x: x + (bGrid.elem_width / 2), center_y: y + (bGrid.elem_width / 2) }
        }
        // else if (type == 1) { -manually done
        //     const x = col * (bGrid.elem_width + bGrid.bond_width) + bGrid.elem_width
        //     const y = row * (bGrid.elem_width + bGrid.bond_width) + bGrid.elem_width
        //     return { left_x: x, top_y: y, right_x: x + bGrid.bond_width, bottom_y: y + bGrid.bond_width, center_x: x + (bGrid.bond_width / 2), center_y: y + (bGrid.bond_width / 2) }
        // }
    }
}
pGrid = {
    elem_width: 25,
    bond_width: 50,
    // add_btn_width:25,
    getGridCoord(type, x, y) {

    },
    getSVGCoord(type, col, row, orientation = 'v') {
        //0 - elem ; 1 - bond
        if (type == 0) {
            const x = col * (pGrid.elem_width + pGrid.bond_width)
            const y = row * (pGrid.elem_width + pGrid.bond_width)
            return { left_x: x, top_y: y, right_x: x + pGrid.elem_width, bottom_y: y + pGrid.elem_width, center_x: x + (pGrid.elem_width / 2), center_y: y + (pGrid.elem_width / 2) }
        }
    }
}
// nodes: { up: { bondtype: null, elem: null }, down: { bondtype: null, elem: null }, left: { bondtype: null, elem: null }, right: { bondtype: 0, elem: 2 } }
elems = [
    null,
    { elem: 'C', params: { row: 1, col: 1, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'C', params: { row: 1, col: 2, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'C', params: { row: 1, col: 3, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'H', params: { row: 0, col: 1, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'H', params: { row: 1, col: 0, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'H', params: { row: 2, col: 1, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'H', params: { row: 0, col: 2, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'H', params: { row: 2, col: 2, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'H', params: { row: 1, col: 4, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'H', params: { row: 0, col: 3, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },

    { elem: 'H', params: { row: 3, col: 0, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'C', params: { row: 3, col: 1, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },
    { elem: 'N', params: { row: 3, col: 2, radical: false, positive_charge: 0, negative_charge: 0, lone_pair: 0 }, nodes_total: 4 },

]
bonds = [
    null,
    { type: 0, from: 1, to: 2, params: {} },
    { type: 1, from: 2, to: 3, params: {} },

    { type: 0, from: 1, to: 4, params: {} },
    { type: 0, from: 1, to: 5, params: {} },
    { type: 0, from: 1, to: 6, params: {} },

    { type: 0, from: 2, to: 7, params: {} },
    { type: 0, from: 2, to: 8, params: {} },

    { type: 0, from: 3, to: 9, params: {} },
    { type: 0, from: 3, to: 10, params: {} },

    { type: 0, from: 11, to: 12, params: {} },
    { type: 2, from: 12, to: 13, params: {} },
]
builder_settings = {}
function load() {
    refreshBuilder()
    refreshPreview()
}

function refreshBuilder() {
    svg_elem = document.getElementById('builder-svg-main')
    svg_elem.innerHTML = ``

    for (i = 1; i < bonds.length; i++) {
        from = elems[bonds[i].from]
        to = elems[bonds[i].to]

        coord1 = bGrid.getSVGCoord(0, from.params.col, from.params.row)
        coord2 = bGrid.getSVGCoord(0, to.params.col, to.params.row)
        if (bonds[i].type == 0) { // 0 - SINGLE
            svg_elem.innerHTML += `<line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:${bGrid.elem_width / 5};"></line>`
        } else if (bonds[i].type == 1) { // 1 - DOUBLE
            svg_elem.innerHTML += `<line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:${3 * bGrid.elem_width / 5};"></line>
            <line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:white;stroke-width:${bGrid.elem_width / 5};"></line>`
        } else if (bonds[i].type == 2) { // 2 - TRIPLE
            svg_elem.innerHTML += `<line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:${bGrid.elem_width};"></line>
            <line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:white;stroke-width:${3 * bGrid.elem_width / 5};"></line>
            <line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:${bGrid.elem_width / 5};"></line>`
        }
    }

    for (i = 1; i < elems.length; i++) {
        coord = bGrid.getSVGCoord(0, elems[i].params.col, elems[i].params.row)
        svg_elem.innerHTML += `<rect width="${bGrid.elem_width}" height="${bGrid.elem_width}" rx="0" ry="0" fill="lightblue" x="${coord.left_x}" y="${coord.top_y}">
                    </rect>
                    <text style="cursor: pointer;" x="${coord.center_x}" y="${coord.center_y}" text-anchor="middle"
                        dominant-baseline="middle">${elems[i].elem}</text>`
    }

}
function refreshPreview() {
    font_size = 30
    svg_elem = document.getElementById('preview-svg-main')
    svg_elem.innerHTML = ``
    //BONDS
    for (i = 1; i < bonds.length; i++) {
        from = elems[bonds[i].from]
        to = elems[bonds[i].to]

        coord1 = pGrid.getSVGCoord(0, from.params.col, from.params.row)
        coord2 = pGrid.getSVGCoord(0, to.params.col, to.params.row)
        if (bonds[i].type == 0) { // 0 - SINGLE
            svg_elem.innerHTML += `<line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:3;"></line>`
        } else if (bonds[i].type == 1) {
            dist_bw_bond_lines = 2 //CHANGE LATER
            svg_elem.innerHTML += `<line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:${(3 * 2) + dist_bw_bond_lines};"></line>
                        <line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:white;stroke-width:${dist_bw_bond_lines};"></line>` //self idea
        } else if (bonds[i].type == 2) {
            dist_bw_bond_lines = 2 //CHANGE LATER
            svg_elem.innerHTML += `<line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:${(3 * 3) + (dist_bw_bond_lines * 2)};"></line>
                        <line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:white;stroke-width:${(dist_bw_bond_lines * 2) + 3};"></line>
                        <line x1="${coord1.center_x}" y1="${coord1.center_y}" x2="${coord2.center_x}" y2="${coord2.center_y}" style="stroke:black;stroke-width:${3};"></line>` //self idea

        }
    }


    //ELEMS
    for (i = 1; i < elems.length; i++) {
        coord = pGrid.getSVGCoord(0, elems[i].params.col, elems[i].params.row)
        svg_elem.innerHTML += `<circle r="${pGrid.elem_width / 2}" cx="${coord.center_x}" cy="${coord.center_y}" fill="white" />
                <text x="${coord.center_x}" y="${coord.center_y + 2}" font-size="${font_size}" text-anchor="middle" dominant-baseline="middle" fill="black">${elems[i].elem}</text>` //CHECK - (+2 on center_y)
    }


}



function exportSVG() {
    const svg = document.getElementById("preview");

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);

    if (!svgString.includes("xmlns")) {
        svgString = svgString.replace(
            "<svg",
            '<svg xmlns="http://www.w3.org/2000/svg"'
        );
    }

    const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${'compound name'}.svg`;
    a.click();

    URL.revokeObjectURL(url);
}
