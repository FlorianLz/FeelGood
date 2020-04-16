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
});

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2Rldi9zY3JpcHQuanMiXSwibmFtZXMiOlsibW9kYWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYnRuIiwic3BhbiIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvbmNsaWNrIiwic3R5bGUiLCJkaXNwbGF5Iiwid2luZG93IiwiZXZlbnQiLCJ0YXJnZXQiLCIkIiwic3VibWl0IiwicHJldmVudERlZmF1bHQiLCJ2YWwiLCJtYXRjaCIsInVwbG9hZEZpbGUiLCJodG1sIiwiZmlsZSIsImZpbGVzIiwiZm9ybWRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImFqYXgiLCJYTUxIdHRwUmVxdWVzdCIsInVwbG9hZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcm9ncmVzc0hhbmRsZXIiLCJjb21wbGV0ZUhhbmRsZXIiLCJlcnJvckhhbmRsZXIiLCJhYm9ydEhhbmRsZXIiLCJvcGVuIiwic2VuZCIsInBlcmNlbnQiLCJsb2FkZWQiLCJ0b3RhbCIsIndpZHRoIiwiTWF0aCIsInJvdW5kIiwiaW5uZXJIVE1MIiwicmVzcG9uc2VUZXh0IiwiY3NzIiwib24iLCJldnQiLCIkc291cmNlIiwic2hvdyIsInNyYyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInBhcmVudCIsImxvYWQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtR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Q0FBZSxRQUFmLEVBQXlCLGFBQXpCLEVBQXdDLFVBQVNDLEdBQVQsRUFBYztBQUNsRGhDLEdBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYU0sSUFBYixDQUFrQixFQUFsQjtBQUNBLE1BQUkyQixPQUFPLEdBQUdqQyxDQUFDLENBQUMsYUFBRCxDQUFmO0FBQ0FBLEdBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJrQyxJQUFuQjtBQUNBRCxTQUFPLENBQUMsQ0FBRCxDQUFQLENBQVdFLEdBQVgsR0FBaUJDLEdBQUcsQ0FBQ0MsZUFBSixDQUFvQixLQUFLN0IsS0FBTCxDQUFXLENBQVgsQ0FBcEIsQ0FBakI7QUFDQXlCLFNBQU8sQ0FBQ0ssTUFBUixHQUFpQixDQUFqQixFQUFvQkMsSUFBcEI7QUFDSCxDQU5ELEUiLCJmaWxlIjoic2NyaXB0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2pzL2Rldi9zY3JpcHQuanNcIik7XG4iLCJsZXQgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsZVBhcnRpY2lwYXRpb25cIik7XHJcbmxldCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcnRpY2lwZXJcIik7XHJcbmxldCBzcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlXCIpWzBdO1xyXG5cclxuYnRuLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbn07XHJcblxyXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcclxuc3Bhbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbn07XHJcblxyXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcclxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSBtb2RhbCkge1xyXG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxufTtcclxuXHJcbi8vVXBsb2FkIGZpY2hpZXIgdmlkw6lvXHJcblxyXG4kKFwiI3VwbG9hZF9mb3JtXCIpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoICQoJyNmaWxlMScpLnZhbCgpLm1hdGNoKC8uK1xcLihtcDQpJC9pKSApe1xyXG4gICAgICAgIHVwbG9hZEZpbGUoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgICQoJyNzdGF0dXMnKS5odG1sKCdBdWN1biBmaWNoaWVyIHPDqWxlY3Rpb25uw6kuJyk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHVwbG9hZEZpbGUoKXtcclxuICAgIGxldCBmaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlMVwiKS5maWxlc1swXTtcclxuICAgIC8vIGFsZXJ0KGZpbGUubmFtZStcIiB8IFwiK2ZpbGUuc2l6ZStcIiB8IFwiK2ZpbGUudHlwZSk7XHJcbiAgICBsZXQgZm9ybWRhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGZvcm1kYXRhLmFwcGVuZChcImZpbGUxXCIsIGZpbGUpO1xyXG4gICAgbGV0IGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIGFqYXgudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBwcm9ncmVzc0hhbmRsZXIsIGZhbHNlKTtcclxuICAgIGFqYXguYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgY29tcGxldGVIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICBhamF4LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcclxuICAgIGFqYXguYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGFib3J0SGFuZGxlciwgZmFsc2UpO1xyXG4gICAgYWpheC5vcGVuKFwiUE9TVFwiLCBcInRyYWl0ZW1lbnQvdXBsb2FkLnBocFwiKTtcclxuICAgIGFqYXguc2VuZChmb3JtZGF0YSk7XHJcbn1cclxuZnVuY3Rpb24gcHJvZ3Jlc3NIYW5kbGVyKGV2ZW50KXtcclxuICAgIGxldCBwZXJjZW50ID0gKGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKSAqIDEwMDtcclxuICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzc0JhclwiKS52YWx1ZSA9IE1hdGgucm91bmQocGVyY2VudCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15QmFyXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15QmFyXCIpLnN0eWxlLndpZHRoID0gTWF0aC5yb3VuZChwZXJjZW50KStcIiVcIjtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzXCIpLmlubmVySFRNTCA9IE1hdGgucm91bmQocGVyY2VudCkrXCIlXCI7XHJcbiAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGVyY2VudFwiKS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKHBlcmNlbnQpK1wiJVwiO1xyXG59XHJcbmZ1bmN0aW9uIGNvbXBsZXRlSGFuZGxlcihldmVudCl7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c1wiKS5pbm5lckhUTUwgPSBldmVudC50YXJnZXQucmVzcG9uc2VUZXh0O1xyXG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2dyZXNzQmFyXCIpLnZhbHVlID0gMDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlCYXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBlcmNlbnRcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgaWYoZXZlbnQudGFyZ2V0LnJlc3BvbnNlVGV4dCA9PT0gJ1ZvdHJlIHZpZMOpbyDDoCBiaWVuIMOpdMOpIGVudm95w6llLiBNZXJjaSAhJyl7XHJcbiAgICAgICAgJCgnI3VwbG9hZF9mb3JtID4gbGFiZWwnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnI3VwbG9hZF9mb3JtID4gaW5wdXQnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGV2ZW50KXtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzXCIpLmlubmVySFRNTCA9IFwiVXBsb2FkIEZhaWxlZFwiO1xyXG59XHJcbmZ1bmN0aW9uIGFib3J0SGFuZGxlcihldmVudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0dXNcIikuaW5uZXJIVE1MID0gXCJVcGxvYWQgQWJvcnRlZFwiO1xyXG59XHJcblxyXG4vL0FwZXLDp3UgZGUgbGEgdmlkw6lvIHPDqWxlY3Rpb25uw6llXHJcbiQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsIFwiLmZpbGVfdmlkZW9cIiwgZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAkKCcjc3RhdHVzJykuaHRtbCgnJyk7XHJcbiAgICBsZXQgJHNvdXJjZSA9ICQoJyN2aWRlb19oZXJlJyk7XHJcbiAgICAkKCcucGxheWVyX3ZpZGVvJykuc2hvdygpO1xyXG4gICAgJHNvdXJjZVswXS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuZmlsZXNbMF0pO1xyXG4gICAgJHNvdXJjZS5wYXJlbnQoKVswXS5sb2FkKCk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=