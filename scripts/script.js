(function(){

	var inputPetName = document.getElementById("petName"),
		inputPetOwner = document.getElementById("petOwner"),
		inputDate = document.getElementById("date"),
		inputTime = document.getElementById("time"),
		inputNotes = document.getElementById("notes"),
		cnt = document.querySelector("#cntNotes"),
		select = document.querySelector("select"),
		flt = document.querySelector("#flt");

	var input = document.getElementsByClassName("allInput");
	var btn = document.querySelector(".addAppointment");

	var notesArr = [];

	function createObj() {                             
		if(input[0].value && input[1].value && input[4].value){       // Можно было через "?" сделать, однако разбираться надо))
			var obj = {
				petName: inputPetName.value,
				ownerName: inputPetOwner.value,
				date: inputDate.value,
				time: inputTime.value,
				noteText: inputNotes.value
			};
			notesArr.push(obj);
			createNotes(notesArr);
	  	} 
	  	else {
	  		alert("Для корректного отображения заметки необходимо заполнить всю форму ввода (дату и время вводить не обязательно)");
	  	}	
	  	for (var i = 0; i < input.length; i++) {
	  		input[i].value = "";
	  	}
	};

	function createNotes(arr) {
		cnt.innerHTML = "";
		for (var i = 0; i < arr.length; i++) {
			createTageAndNotes(arr[i].petName, arr[i].ownerName, arr[i].date, arr[i].time, arr[i].noteText);
		}
	}

	function createTageAndNotes(name, owner, date, time, notes) {
		
		var newDivContainer = document.createElement("div");
		newDivContainer.setAttribute("class", "newDivContainer");
		cnt.appendChild(newDivContainer);

		var newName = document.createElement("h3");
		newName.textContent = name;
		newName.setAttribute("class", "newName");
		newDivContainer.appendChild(newName);
		
		var newOwner = document.createElement("p");
		newOwner.innerHTML = "<b>Owner:</b> " + owner;
		newOwner.setAttribute("class", "newOwner");
		newDivContainer.appendChild(newOwner);
		
		var newDate = document.createElement("p");
		newDate.innerHTML = "<i>" + date + "</i>";
		newDate.setAttribute("class", "newDate");
		newDivContainer.appendChild(newDate);

		var newTime = document.createElement("p");
		newTime.innerHTML = "<i>" + time + "</i>";
		newTime.setAttribute("class", "newTime");
		newDivContainer.appendChild(newTime);

		var newNotes = document.createElement("p");
		newNotes.innerHTML = notes + "<br>" + "<hr>";
		newNotes.setAttribute("class", "newNotes");
		newDivContainer.appendChild(newNotes);

		var span = document.createElement("span");
	    span.setAttribute("class", "remove");
	    newDivContainer.appendChild(span);
	    span.onclick = function(){
	    	cnt.removeChild(this.parentElement);
	   		for (var i = 0; i < notesArr.length; i++) {
	   			if (notesArr[i].noteText == this.previousSibling.textContent) {
	   				notesArr.splice(i, 1);
	   				console.log(i);
	   			}
	   		}    	
	    };
	};

	for (var i = 0; i < input.length; i++) {
		input[i].onkeypress = function(e){
			if(e.keyCode == 13){
			createObj();
			}
		}
	 } 

	btn.onclick = createObj;

// Sort

	select.onchange = function(e){
		if(e.target.value == "up"){
			notesArr.sort(function(a,b){
				if(a.petName.toLowerCase() > b.petName.toLowerCase()){
					return 1
				}
				else {
					return -1
				}
			});
			createNotes(notesArr);
		}
		else if (e.target.value == "up2") {
			notesArr.sort(function(a,b){
				if(a.ownerName.toLowerCase() > b.ownerName.toLowerCase()){
					return 1
				}
				else {
					return -1
				}
			});
			createNotes(notesArr);			
		}
		else if (e.target.value == "down2") {
			notesArr.sort(function(a,b){
				if(a.ownerName.toLowerCase() > b.ownerName.toLowerCase()){
					return -1
				}
				else {
					return 1
				}
			});
			createNotes(notesArr);			
		}
		else {
			notesArr.sort(function(a,b){
				if(a.petName.toLowerCase() > b.petName.toLowerCase()){
					return -1
				}
				else {
					return 1
				}
			});
			createNotes(notesArr);
		}
	}

// Filter

	flt.oninput = function(e){
		var term = e.target.value;
		var fltNotes = notesArr.filter(function(item){
			if(item.petName.indexOf(term) > -1){
				return true
			}
			else {
				return false
			}
		});
		createNotes(fltNotes);
	}

// Open & Close window

	var a = document.getElementsByClassName("addContainer")
	var testClick = document.getElementById("testClick");
	var testClick2 = document.getElementById("testClick2");

	testClick.onclick = function () {
	  	a[0].style.display = 'block';
	}
	testClick2.onclick = function () {
	  	a[0].style.display = 'none';
	}

})();



