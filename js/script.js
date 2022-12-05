const notesContainer = document.getElementsByClassName('notesContainer')[0]
const noteFormContainer = document.getElementsByClassName('noteFormContainer')[0]
const addNoteBtn = document.getElementById('addNoteBtn')
const closeTextareaBtn = document.getElementById('closeTextareaBtn')
const textarea = document.querySelector('#noteTextarea')

const notesList = JSON.parse(localStorage.getItem('notes_list')) || []
let i = 0

function typeNote() {
  noteFormContainer.style.display = 'block'
}

function removeNote(pos) {
  notesList.splice(pos, 1)
  showNote()
  saveToLocalstorage()
}

function showNote() {
  notesContainer.innerHTML = ''

  for (item of notesList) {
    const noteDiv = document.createElement('div')
    const noteH1 = document.createElement('h1')
    const noteText = document.createTextNode(item)

    noteH1.setAttribute(
      'style',
      'width:250px; height:250px; font-size:26px; padding:25px;margin-top:10px; overflow:hidden; box-shadow: 0px 10px 24px 0px rgba(0,0,0,0.25)',
    )

    noteH1.style.margin = margin()
    noteH1.style.transform = rotate()
    noteH1.style.background = color()

    noteDiv.addEventListener('mouseenter', function () {
      noteDiv.style.transform = 'scale(1.1)'
    })
    noteDiv.addEventListener('mouseleave', function () {
      noteDiv.style.transform = 'scale(1)'
    })
    const pos = notesList.indexOf(item) 
    noteDiv.setAttribute('ondblclick', `removeNote(${pos})`)    

    noteH1.appendChild(noteText)
    noteDiv.appendChild(noteH1)
    notesContainer.appendChild(noteDiv)
  }
}

showNote()

function createNote() {
  const noteText = textarea.value
  notesList.push(noteText)

  showNote()
  saveToLocalstorage()

  textarea.value = ''
  noteFormContainer.style.display = 'none'
}

function removeNote(pos) {
  notesList.splice(pos, 1)
  showNote()
  saveToLocalstorage()
  console.log('clicou')
}

function margin() {
  let random_margin = ['-5px', '1px', '5px', '10px', '15px', '20px']
  return random_margin[Math.floor(Math.random() * random_margin.length)]
}

function rotate() {
  let random_rotate = [
    'rotate(5deg)',
    'rotate(-7deg)',
    'rotate(2deg)',
    'rotate(-2deg)',
    'rotate(4deg)',
    'rotate(-5deg)',
  ]
  return random_rotate[Math.floor(Math.random() * random_rotate.length)]
}

function color() {
  let random_color = [
    '#c2ff3d',
    '#ff3de8',
    '#3dc2ff',
    '#04e022',
    '#bc83e6',
    '#ebb328',
  ]
  if (i > random_color.length - 1) {
    i = 0
  }
  return random_color[i++]
}

function saveToLocalstorage() {
  localStorage.setItem('notes_list', JSON.stringify(notesList))
}

closeTextareaBtn.addEventListener('click', () => {
  noteFormContainer.style.display = 'none'
})

addNoteBtn.addEventListener('click', createNote)
