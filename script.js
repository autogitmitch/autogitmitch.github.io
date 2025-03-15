document.addEventListener("DOMContentLoaded", function () {
  const songsContainer = document.getElementById("songsContainer")
  const addButton = document.getElementById("addButton")
  const totalPriceDiv = document.getElementById("totalPrice")
  let totalCost = 0

  addButton.addEventListener("click", function () {
    const song = document.createElement("div")
    song.className = "song"
    song.style.opacity = 0

    const typeSelect = document.createElement("select")
    typeSelect.innerHTML = `
            <option value="">Select Type</option>
            <option value="mix">Mix</option>
            <option value="master">Master</option>
            <option value="revision">Revision</option>
        `

    song.appendChild(typeSelect)

    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.placeholder = "Title"
    song.appendChild(titleInput)

    // Add dynamic content based on selection
    typeSelect.addEventListener("change", function () {
      const selectedType = typeSelect.value
      if (selectedType === "") return // Do nothing if no type is selected

      // Clear existing content except for typeSelect and titleInput
      while (song.children.length > 2) {
        song.removeChild(song.lastChild)
      }

      if (selectedType === "mix") {
        let mixPrice = 75 // Base price for mix with no revisions
        const priceSpan = document.createElement("span")
        priceSpan.textContent = `$${mixPrice} (no revisions)`
        song.appendChild(priceSpan)

        const revisionsSelect = document.createElement("select")
        revisionsSelect.innerHTML = `
                    <option value="none">No revisions</option>
                    <option value="1-2">1-2 revisions</option>
                    <option value="unlimited">Unlimited revisions</option>
                `
        song.appendChild(revisionsSelect)

        revisionsSelect.addEventListener("change", function () {
          const selectedRevision = revisionsSelect.value
          if (selectedRevision === "none") {
            mixPrice = 75
          } else if (selectedRevision === "1-2") {
            mixPrice = 100
          } else if (selectedRevision === "unlimited") {
            mixPrice = 150
          }
          if (addMasteringCheckbox && addMasteringCheckbox.checked) {
            mixPrice += 25
          }
          if (over8TracksCheckbox && over8TracksCheckbox.checked) {
            mixPrice += 25
          }
          priceSpan.textContent = `$${mixPrice} (${selectedRevision === "none" ? "no revisions" : selectedRevision === "1-2" ? "1-2 revisions" : "unlimited revisions"})`
          updateTotalPrice()
        })

        const addMasteringCheckbox = document.createElement("input")
        addMasteringCheckbox.type = "checkbox"
        const addMasteringLabel = document.createElement("label")
        addMasteringLabel.textContent = "Add mastering? (+$25)"
        addMasteringLabel.appendChild(addMasteringCheckbox)
        song.appendChild(addMasteringLabel)

        addMasteringCheckbox.addEventListener("change", function () {
          const selectedRevision = revisionsSelect.value
          if (selectedRevision === "none") {
            mixPrice = 75
          } else if (selectedRevision === "1-2") {
            mixPrice = 100
          } else if (selectedRevision === "unlimited") {
            mixPrice = 150
          }
          if (addMasteringCheckbox.checked) {
            mixPrice += 25
          } else if (
            !addMasteringCheckbox.checked &&
            mixPrice >
              (selectedRevision === "none"
                ? 75
                : selectedRevision === "1-2"
                  ? 100
                  : 150)
          ) {
            mixPrice -= 25
          }
          if (over8TracksCheckbox && over8TracksCheckbox.checked) {
            mixPrice += 25
          }
          priceSpan.textContent = `$${mixPrice} (${selectedRevision === "none" ? "no revisions" : selectedRevision === "1-2" ? "1-2 revisions" : "unlimited revisions"})`
          updateTotalPrice()
        })

        const over8TracksCheckbox = document.createElement("input")
        over8TracksCheckbox.type = "checkbox"
        const over8TracksLabel = document.createElement("label")
        over8TracksLabel.textContent = "Over 8 tracks? (+$25)"
        over8TracksLabel.appendChild(over8TracksCheckbox)
        song.appendChild(over8TracksLabel)

        over8TracksCheckbox.addEventListener("change", function () {
          const selectedRevision = revisionsSelect.value
          if (selectedRevision === "none") {
            mixPrice = 75
          } else if (selectedRevision === "1-2") {
            mixPrice = 100
          } else if (selectedRevision === "unlimited") {
            mixPrice = 150
          }
          if (addMasteringCheckbox.checked) {
            mixPrice += 25
          }
          if (over8TracksCheckbox.checked) {
            mixPrice += 25
          } else if (
            !over8TracksCheckbox.checked &&
            mixPrice >
              (selectedRevision === "none"
                ? 75
                : selectedRevision === "1-2"
                  ? 100
                  : 150) +
                (addMasteringCheckbox.checked ? 25 : 0)
          ) {
            mixPrice -= 25
          }
          priceSpan.textContent = `$${mixPrice} (${selectedRevision === "none" ? "no revisions" : selectedRevision === "1-2" ? "1-2 revisions" : "unlimited revisions"})`
          updateTotalPrice()
        })

        const notesTextarea = document.createElement("textarea")
        notesTextarea.placeholder = "Notes"
        song.appendChild(notesTextarea)

        const uploadSelect = document.createElement("select")
        uploadSelect.innerHTML = `
                    <option value="protoolsSession" selected>ProTools Session</option>
                    <option value="stems">Stems</option>
                    <option value="collabLink">Collab Link</option>
                `
        song.appendChild(uploadSelect)

        const linkInput = document.createElement("input")
        linkInput.type = "text"
        linkInput.placeholder = "Paste link"
        linkInput.style.display = "none"
        song.appendChild(linkInput)

        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.multiple = true
        fileInput.style.display = "block"
        song.appendChild(fileInput)

        uploadSelect.addEventListener("change", function () {
          const selectedUploadType = uploadSelect.value
          if (selectedUploadType === "collabLink") {
            linkInput.style.display = "block"
            fileInput.style.display = "none"
          } else if (
            selectedUploadType === "stems" ||
            selectedUploadType === "protoolsSession"
          ) {
            linkInput.style.display = "none"
            fileInput.style.display = "block"
          }
        })
      } else if (selectedType === "master") {
        let masterPrice = 40
        const priceSpan = document.createElement("span")
        priceSpan.textContent = `$${masterPrice} (no revisions)`
        song.appendChild(priceSpan)

        const revisionsSelect = document.createElement("select")
        revisionsSelect.innerHTML = `
                    <option value="none">No revisions</option>
                    <option value="1-2">1-2 revisions</option>
                `
        song.appendChild(revisionsSelect)

        revisionsSelect.addEventListener("change", function () {
          const selectedRevision = revisionsSelect.value
          if (selectedRevision === "none") {
            masterPrice = 40
          } else if (selectedRevision === "1-2") {
            masterPrice = 65
          }
          priceSpan.textContent = `$${masterPrice} (${selectedRevision === "none" ? "no revisions" : selectedRevision === "1-2" ? "1-2 revisions" : ""})`
          updateTotalPrice()
        })

        const notesTextarea = document.createElement("textarea")
        notesTextarea.placeholder = "Notes"
        song.appendChild(notesTextarea)

        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.multiple = true
        song.appendChild(fileInput)
      } else if (selectedType === "revision") {
        const priceSpan = document.createElement("span")
        priceSpan.textContent = "$30"
        song.appendChild(priceSpan)

        const notesTextarea = document.createElement("textarea")
        notesTextarea.placeholder = "Notes (required)"
        song.appendChild(notesTextarea)

        updateTotalPrice()
      }

      updateTotalPrice() // Update total price after selecting a type

      // Add Remove button
      const removeButton = document.createElement("button")
      removeButton.textContent = "REMOVE"
      removeButton.style.marginTop = "10px"
      removeButton.className = "remove-button"
      removeButton.style.textTransform = "uppercase"
      song.appendChild(removeButton)

      removeButton.addEventListener("click", function () {
        song.style.opacity = 0
        setTimeout(function () {
          song.parentNode.removeChild(song)
        }, 500)
        updateTotalPrice()
      })
    })

    // Add Remove button for initial state (before type selection)
    const initialRemoveButton = document.createElement("button")
    initialRemoveButton.textContent = "REMOVE"
    initialRemoveButton.style.marginTop = "10px"
    initialRemoveButton.className = "remove-button"
    initialRemoveButton.style.textTransform = "uppercase"
    song.appendChild(initialRemoveButton)

    initialRemoveButton.addEventListener("click", function () {
      song.style.opacity = 0
      setTimeout(function () {
        song.parentNode.removeChild(song)
      }, 500)
    })

    // Get the parent element of songsContainer and addButton
    const parentElement = songsContainer.parentNode

    // Insert the new song segment before the addButton
    parentElement.insertBefore(song, addButton)

    setTimeout(function () {
      song.style.opacity = 1
    }, 100)

    updateTotalPrice() // Update total price after adding a new song
  })

  document
    .getElementById("completeButton")
    .addEventListener("mouseover", function () {
      this.style.backgroundColor = "green"
      this.textContent = "THANK YOU"
    })

  document
    .getElementById("completeButton")
    .addEventListener("mouseout", function () {
      this.style.backgroundColor = "red"
      this.textContent = "COMPLETE"
    })

  document
    .getElementById("completeButton")
    .addEventListener("click", function () {
      const name = document.getElementById("nameInput").value
      const phone = document.getElementById("phoneInput").value
      const email = document.getElementById("emailInput").value
      const totalCost = parseFloat(
        document
          .getElementById("totalPrice")
          .textContent.replace("Total: $", "")
          .replace("(", "")
          .replace(")", ""),
      )

      // Validate inputs
      if (!name) {
        document.getElementById("nameInput").style.border = "1px solid red"
      } else {
        document.getElementById("nameInput").style.border = "none"
      }

      if (!phone) {
        document.getElementById("phoneInput").style.border = "1px solid red"
      } else {
        document.getElementById("phoneInput").style.border = "none"
      }

      if (!email || !email.includes("@")) {
        document.getElementById("emailInput").style.border = "1px solid red"
      } else {
        document.getElementById("emailInput").style.border = "none"
      }

      if (totalCost >= 1 && name && phone && email && email.includes("@")) {
        // Collapse and reset form
        const songs = document.querySelectorAll(".song")
        songs.forEach((song) => {
          song.style.opacity = 0
          setTimeout(function () {
            song.parentNode.removeChild(song)
          }, 500)
        })

        setTimeout(function () {
          document.getElementById("completeButton").style.backgroundColor =
            "red"
          document.getElementById("completeButton").textContent = "COMPLETE"
          document.getElementById("totalPrice").textContent = "Total: $0"
          document.getElementById("totalPrice").style.color = "white"
          document.getElementById("nameInput").style.border = "none"
          document.getElementById("phoneInput").style.border = "none"
          document.getElementById("emailInput").style.border = "none"
        }, 1000)

        // Save inputs
        localStorage.setItem("name", name)
        localStorage.setItem("phone", phone)
        localStorage.setItem("email", email)
      }
    })

  // Load saved inputs
  const savedName = localStorage.getItem("name")
  const savedPhone = localStorage.getItem("phone")
  const savedEmail = localStorage.getItem("email")

  if (savedName) {
    document.getElementById("nameInput").value = savedName
  }
  if (savedPhone) {
    document.getElementById("phoneInput").value = savedPhone
  }
  if (savedEmail) {
    document.getElementById("emailInput").value = savedEmail
  }
})

function updateTotalPrice() {
  let totalCost = 0
  const songs = document.querySelectorAll(".song")
  songs.forEach((song) => {
    const priceSpan = song.querySelector("span")
    if (priceSpan) {
      const priceText = priceSpan.textContent
      const price = parseFloat(
        priceText.replace("$", "").replace("(", "").replace(")", ""),
      )
      totalCost += price
    }
  })

  let discountText = ""
  let discountedAmount = 0

  if (totalCost >= 500) {
    discountedAmount = totalCost * 0.25
    discountText = "(%25 off)"
  } else if (totalCost >= 400) {
    discountedAmount = totalCost * 0.2
    discountText = "(%20 off)"
  } else if (totalCost >= 300) {
    discountedAmount = totalCost * 0.15
    discountText = "(%15 off)"
  } else if (totalCost >= 200) {
    discountedAmount = totalCost * 0.1
    discountText = "(%10 off)"
  }

  let finalAmount = totalCost - discountedAmount

  if (discountText) {
    document.getElementById("totalPrice").textContent =
      `Total: $${totalCost.toFixed(2)} ${discountText} = $${finalAmount.toFixed(2)}`
  } else {
    document.getElementById("totalPrice").textContent =
      `Total: $${totalCost.toFixed(2)}`
  }
}
