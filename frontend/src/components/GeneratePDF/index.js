import jsPDF from 'jspdf'
import { ColorButton } from './styles'

var wrapWidth = 450
var wrapHeight = 750



const GeneratePDF = ({ header, data}) => {
    const generate = () => {
        let doc = new jsPDF('p','pt')
        var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tincidunt ex. Duis interdum ultricies tempor. Mauris condimentum et dui a blandit. Suspendisse et mattis lectus. Nam rhoncus, odio vel pharetra fermentum, nisl lectus tincidunt nibh, ut egestas diam justo quis dolor. Praesent justo neque, lacinia sed arcu a, dapibus tempor erat. Etiam feugiat eros nisi, ut vestibulum arcu ultricies ut. Nullam iaculis pharetra ligula quis imperdiet. Suspendisse potenti. Integer imperdiet metus sapien. Aenean sodales, odio nec convallis semper, est neque viverra augue, sed tempor dolor ante eu diam. Proin tincidunt cursus sem, sed tincidunt tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.....'
        
        const write = (text, Ypos) => {
            var splitText = doc.splitTextToSize(text, wrapWidth)
            for (var i = 0, length = splitText.length; i < length; i++) {
                if(Ypos >= wrapHeight) {
                    doc.insertPage()
                    Ypos = 60
                }
                if (i===0)doc.text(90, Ypos, splitText[i])
                else doc.text(50, Ypos, splitText[i])
        
        
                Ypos = 15 + Ypos
              }
            return Ypos
        }

        doc.setFontSize(20)
        doc.text(50,60, header.title)
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text(50,90, header.user)
        doc.setFont('helvetica', 'normal')
        var Ypos = write(header.description, 120)        
        Ypos = Ypos + 30
        console.log(data)
        doc.setFont('helvetica', 'normal')
        Ypos = Ypos + 40
        data.map( line => {
            Ypos = Ypos + 20            
            Ypos = write(`${line.parent}:    ${line.sentence}......${line.child||line.label}`, Ypos)
        })
        doc.save("two-by-four.pdf")
    }
    return (
        <ColorButton color='primary' variant='contained' onClick={ () => generate()}>Download PDF</ColorButton>
    )
}

export default GeneratePDF