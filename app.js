
window.onload = () => {
    main()
}

// Globals

const converter = {
    dataTransferRate: {
        name: 'Data Transfer Rate',
    },
    area: {
        name: 'Area',
    },
    mass: {
        name: 'Mass',
    },
    length: {
        name: 'length',
    },
    volume: {
        name: 'Volume',
    },
    
}



function main(){

    
    const converterKeys  = Object.keys(converter).sort()

    
    // DOM References
    const selectCategory = document.getElementById('select-category')
    

    // Add event listeners
    

    // event listener with function call

    // Default call
    handleConverterKeys(converterKeys,selectCategory)
}

// event handler
function handleConverterKeys(converterKeys,selectCategory){
    deleteAllChild(selectCategory)
    converterKeys.forEach((item) => {
        addOption(selectCategory, {value: item,text: converter[item].name})

    })
}

// DOM function

function addOption(parent, option){
        
    const opt = document.createElement('option')
    opt.setAttribute('value', option.value)
    opt.innerText = option.text
    parent.appendChild(opt)
}

function deleteAllChild(parent){
    while(parent.firstChild){
        parent.firstChild.remove()
    }
}

// Units function
