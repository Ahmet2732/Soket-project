const socket = io("http://localhost:3000");

let allNotes = [];

socket.on("connect", (x) => {
  socket.emit("load");
});

function addNote() {
  const name = document.getElementById("noteTitle").value.trim();
  const description = document.getElementById("noteDesc").value.trim();

  if (!name && !description) {
    alert("Both title and description are empty");
    return;
  }
  if (!name || !description) {
    alert(" title or description are empty");
    return;
  }
  let note = {
    name,
    description,
  };
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteDesc").value = "";

  document.getElementById("noteTitle").focus();

  socket.emit("addNote", note);

  socket.on("allData", (data) => {
    allNotes = data;
    displayData();
  });
}

function displayData() {
  let cartona = ``;
  for (let i = 0; i < allNotes.length; i++) {
    cartona += `     <div class="col-md-4 mb-5">
        <div class="border bg-white text-dark rounded-3 p-5 text-center" >
            <h3>${allNotes[i]["name"]}</h3>
            <p>${allNotes[i]["description"]}</p>

            <button class="btn btn-warning" onclick="updateNote('${allNotes[i]._id}')">Update</button>
            <button class="btn btn-danger" onclick="deleteNote('${allNotes[i]._id}')">Delete</button>
        </div>
    </div>`;
  }
  document.getElementById("rows").innerHTML = cartona;
}

function updateNote(id) {
  const noteToUpdate = allNotes.find((note) => note._id === id);

  if (noteToUpdate) {
    const updatedName = prompt("Update Note Title:", noteToUpdate.name);
    const updatedDescription = prompt(
      "Update Note Description:",
      noteToUpdate.description
    );

    if (updatedName !== null && updatedDescription !== null) {
      noteToUpdate.name = updatedName;
      noteToUpdate.description = updatedDescription;
      socket.emit("updateNote", {
        id,
        name: updatedName,
        description: updatedDescription,
      });
    }
  }
}

function deleteNote(id) {
  console.log(id);
  socket.emit("deleteNote", id);
}
