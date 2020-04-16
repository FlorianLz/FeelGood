/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/dev/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/dev/script.js":
/*!*********************************!*\
  !*** ./assets/js/dev/script.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var modal = document.getElementById("modaleParticipation");
var btn = document.getElementById("participer");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}; // When the user clicks on <span> (x), close the modal


span.onclick = function () {
  modal.style.display = "none";
}; // When the user clicks anywhere outside of the modal, close it


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}; //Upload fichier vidéo


$("#upload_form").submit(function (event) {
  event.preventDefault();

  if ($('#file1').val().match(/.+\.(mp4)$/i)) {
    uploadFile();
  } else {
    $('#status').html('Aucun fichier sélectionné.');
  }
}); //Modal connect

var modalConnect = document.getElementById("modaleConnect");
var btnConnect = document.getElementById("connect");
var spanConnect = document.getElementById("closeConnect");

btnConnect.onclick = function () {
  modalConnect.style.display = "block";
};

spanConnect.onclick = function () {
  modalConnect.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalConnect) {
    modalConnect.style.display = "none";
  }
};

function uploadFile() {
  var file = document.getElementById("file1").files[0]; // alert(file.name+" | "+file.size+" | "+file.type);

  var formdata = new FormData();
  formdata.append("file1", file);
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener("progress", progressHandler, false);
  ajax.addEventListener("load", completeHandler, false);
  ajax.addEventListener("error", errorHandler, false);
  ajax.addEventListener("abort", abortHandler, false);
  ajax.open("POST", "traitement/upload.php");
  ajax.send(formdata);
}

function progressHandler(event) {
  var percent = event.loaded / event.total * 100; //document.getElementById("progressBar").value = Math.round(percent);

  document.getElementById("myBar").style.display = "block";
  document.getElementById("myBar").style.width = Math.round(percent) + "%";
  document.getElementById("status").innerHTML = Math.round(percent) + "%"; //document.getElementById("percent").innerHTML = Math.round(percent)+"%";
}

function completeHandler(event) {
  document.getElementById("status").innerHTML = event.target.responseText; //document.getElementById("progressBar").value = 0;

  document.getElementById("myBar").style.display = "none"; //document.getElementById("percent").style.display = "none";

  if (event.target.responseText === 'Votre vidéo à bien été envoyée. Merci !') {
    $('#upload_form > label').css('visibility', 'hidden');
    $('#upload_form > input').css('visibility', 'hidden');
  }
}

function errorHandler(event) {
  document.getElementById("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
  document.getElementById("status").innerHTML = "Upload Aborted";
} //Aperçu de la vidéo sélectionnée


$(document).on("change", ".file_video", function (evt) {
  $('#status').html('');
  var $source = $('#video_here');
  $('.player_video').show();
  $source[0].src = URL.createObjectURL(this.files[0]);
  $source.parent()[0].load();
});
$('.togglelike').click(function (e) {
  e.preventDefault();
  console.log('clic');
  var idVideo = $(this).attr('data-id');
  var formData = {
    'idVideo': idVideo
  };
  $.post("./traitement/like.php", formData, function (data) {
    //On envoi le tout vers la page de traitement
    $('#like' + idVideo).html(data);
    $.post("./traitement/nblikes.php", formData, function (data) {
      //On envoi le tout vers la page de traitement
      $('#nblike' + idVideo).html(data);
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2Rldi9zY3JpcHQuanMiXSwibmFtZXMiOlsibW9kYWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYnRuIiwic3BhbiIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvbmNsaWNrIiwic3R5bGUiLCJkaXNwbGF5Iiwid2luZG93IiwiZXZlbnQiLCJ0YXJnZXQiLCIkIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJ2YWwiLCJtYXRjaCIsInVwbG9hZEZpbGUiLCJodG1sIiwibW9kYWxDb25uZWN0IiwiYnRuQ29ubmVjdCIsInNwYW5Db25uZWN0IiwiZmlsZSIsImZpbGVzIiwiZm9ybWRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImFqYXgiLCJYTUxIdHRwUmVxdWVzdCIsInVwbG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm9ncmVzc0hhbmRsZXIiLCJjb21wbGV0ZUhhbmRsZXIiLCJlcnJvckhhbmRsZXIiLCJhYm9ydEhhbmRsZXIiLCJvcGVuIiwic2VuZCIsInBlcmNlbnQiLCJsb2FkZWQiLCJ0b3RhbCIsIndpZHRoIiwiTWF0aCIsInJvdW5kIiwiaW5uZXJIVE1MIiwicmVzcG9uc2VUZXh0IiwiY3NzIiwib24iLCJldnQiLCIkc291cmNlIiwic2hvdyIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBhcmVudCIsImxvYWQiLCJjbGljayIsImUiLCJjb25zb2xlIiwibG9nIiwiaWRWaWRlbyIsImF0dHIiLCJmb3JtRGF0YSIsInBvc3QiLCJkYXRhIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNB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LENBQXBCLENBQWpCO0FBQ0F5QixTQUFPLENBQUNLLE1BQVIsR0FBaUIsQ0FBakIsRUFBb0JDLElBQXBCO0FBQ0gsQ0FORDtBQVFBMUMsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQjJDLEtBQWpCLENBQXVCLFVBQVVDLENBQVYsRUFBYTtBQUNoQ0EsR0FBQyxDQUFDMUMsY0FBRjtBQUNBMkMsU0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBLE1BQUlDLE9BQU8sR0FBRy9DLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUWdELElBQVIsQ0FBYSxTQUFiLENBQWQ7QUFFQSxNQUFJQyxRQUFRLEdBQUM7QUFDVCxlQUFZRjtBQURILEdBQWI7QUFJQS9DLEdBQUMsQ0FBQ2tELElBQUYsQ0FBTyx1QkFBUCxFQUFnQ0QsUUFBaEMsRUFBMEMsVUFBVUUsSUFBVixFQUFnQjtBQUFFO0FBQ3hEbkQsS0FBQyxDQUFDLFVBQVErQyxPQUFULENBQUQsQ0FBbUJ6QyxJQUFuQixDQUF3QjZDLElBQXhCO0FBQ0FuRCxLQUFDLENBQUNrRCxJQUFGLENBQU8sMEJBQVAsRUFBbUNELFFBQW5DLEVBQTZDLFVBQVVFLElBQVYsRUFBZ0I7QUFBRTtBQUMzRG5ELE9BQUMsQ0FBQyxZQUFVK0MsT0FBWCxDQUFELENBQXFCekMsSUFBckIsQ0FBMEI2QyxJQUExQjtBQUNILEtBRkQ7QUFHSCxHQUxEO0FBTUgsQ0FmRCxFIiwiZmlsZSI6InNjcmlwdC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9qcy9kZXYvc2NyaXB0LmpzXCIpO1xuIiwibGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbGVQYXJ0aWNpcGF0aW9uXCIpO1xubGV0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFydGljaXBlclwiKTtcbmxldCBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlXCIpWzBdO1xuXG5idG4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59O1xuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbnNwYW4ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn07XG5cbi8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbn07XG5cbi8vVXBsb2FkIGZpY2hpZXIgdmlkw6lvXG5cbiQoXCIjdXBsb2FkX2Zvcm1cIikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmICggJCgnI2ZpbGUxJykudmFsKCkubWF0Y2goLy4rXFwuKG1wNCkkL2kpICl7XG4gICAgICAgIHVwbG9hZEZpbGUoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgJCgnI3N0YXR1cycpLmh0bWwoJ0F1Y3VuIGZpY2hpZXIgc8OpbGVjdGlvbm7DqS4nKTtcbiAgICB9XG5cbn0pO1xuXG5cbi8vTW9kYWwgY29ubmVjdFxubGV0IG1vZGFsQ29ubmVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxlQ29ubmVjdFwiKTtcbmxldCBidG5Db25uZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25uZWN0XCIpO1xubGV0IHNwYW5Db25uZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUNvbm5lY3RcIik7XG5cbmJ0bkNvbm5lY3Qub25jbGljayA9IGZ1bmN0aW9uKCl7XG4gICAgbW9kYWxDb25uZWN0LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59O1xuXG5zcGFuQ29ubmVjdC5vbmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICBtb2RhbENvbm5lY3Quc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufTtcblxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCl7XG4gICAgaWYoZXZlbnQudGFyZ2V0ID09IG1vZGFsQ29ubmVjdCl7XG4gICAgICAgIG1vZGFsQ29ubmVjdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiB1cGxvYWRGaWxlKCl7XG4gICAgbGV0IGZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGUxXCIpLmZpbGVzWzBdO1xuICAgIC8vIGFsZXJ0KGZpbGUubmFtZStcIiB8IFwiK2ZpbGUuc2l6ZStcIiB8IFwiK2ZpbGUudHlwZSk7XG4gICAgbGV0IGZvcm1kYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybWRhdGEuYXBwZW5kKFwiZmlsZTFcIiwgZmlsZSk7XG4gICAgbGV0IGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBhamF4LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NIYW5kbGVyLCBmYWxzZSk7XG4gICAgYWpheC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBjb21wbGV0ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICBhamF4LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICBhamF4LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBhYm9ydEhhbmRsZXIsIGZhbHNlKTtcbiAgICBhamF4Lm9wZW4oXCJQT1NUXCIsIFwidHJhaXRlbWVudC91cGxvYWQucGhwXCIpO1xuICAgIGFqYXguc2VuZChmb3JtZGF0YSk7XG59XG5mdW5jdGlvbiBwcm9ncmVzc0hhbmRsZXIoZXZlbnQpe1xuICAgIGxldCBwZXJjZW50ID0gKGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKSAqIDEwMDtcbiAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZ3Jlc3NCYXJcIikudmFsdWUgPSBNYXRoLnJvdW5kKHBlcmNlbnQpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlCYXJcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15QmFyXCIpLnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChwZXJjZW50KStcIiVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c1wiKS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKHBlcmNlbnQpK1wiJVwiO1xuICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwZXJjZW50XCIpLmlubmVySFRNTCA9IE1hdGgucm91bmQocGVyY2VudCkrXCIlXCI7XG59XG5mdW5jdGlvbiBjb21wbGV0ZUhhbmRsZXIoZXZlbnQpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzXCIpLmlubmVySFRNTCA9IGV2ZW50LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2dyZXNzQmFyXCIpLnZhbHVlID0gMDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15QmFyXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGVyY2VudFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgaWYoZXZlbnQudGFyZ2V0LnJlc3BvbnNlVGV4dCA9PT0gJ1ZvdHJlIHZpZMOpbyDDoCBiaWVuIMOpdMOpIGVudm95w6llLiBNZXJjaSAhJyl7XG4gICAgICAgICQoJyN1cGxvYWRfZm9ybSA+IGxhYmVsJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICAkKCcjdXBsb2FkX2Zvcm0gPiBpbnB1dCcpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBlcnJvckhhbmRsZXIoZXZlbnQpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzXCIpLmlubmVySFRNTCA9IFwiVXBsb2FkIEZhaWxlZFwiO1xufVxuZnVuY3Rpb24gYWJvcnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNcIikuaW5uZXJIVE1MID0gXCJVcGxvYWQgQWJvcnRlZFwiO1xufVxuXG4vL0FwZXLDp3UgZGUgbGEgdmlkw6lvIHPDqWxlY3Rpb25uw6llXG4kKGRvY3VtZW50KS5vbihcImNoYW5nZVwiLCBcIi5maWxlX3ZpZGVvXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICQoJyNzdGF0dXMnKS5odG1sKCcnKTtcbiAgICBsZXQgJHNvdXJjZSA9ICQoJyN2aWRlb19oZXJlJyk7XG4gICAgJCgnLnBsYXllcl92aWRlbycpLnNob3coKTtcbiAgICAkc291cmNlWzBdLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5maWxlc1swXSk7XG4gICAgJHNvdXJjZS5wYXJlbnQoKVswXS5sb2FkKCk7XG59KTtcblxuJCgnLnRvZ2dsZWxpa2UnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zb2xlLmxvZygnY2xpYycpO1xuICAgIGxldCBpZFZpZGVvID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG5cbiAgICBsZXQgZm9ybURhdGE9e1xuICAgICAgICAnaWRWaWRlbycgOiBpZFZpZGVvLFxuICAgIH07XG5cbiAgICAkLnBvc3QoXCIuL3RyYWl0ZW1lbnQvbGlrZS5waHBcIiwgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7IC8vT24gZW52b2kgbGUgdG91dCB2ZXJzIGxhIHBhZ2UgZGUgdHJhaXRlbWVudFxuICAgICAgICAkKCcjbGlrZScraWRWaWRlbykuaHRtbChkYXRhKTtcbiAgICAgICAgJC5wb3N0KFwiLi90cmFpdGVtZW50L25ibGlrZXMucGhwXCIsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkgeyAvL09uIGVudm9pIGxlIHRvdXQgdmVycyBsYSBwYWdlIGRlIHRyYWl0ZW1lbnRcbiAgICAgICAgICAgICQoJyNuYmxpa2UnK2lkVmlkZW8pLmh0bWwoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==