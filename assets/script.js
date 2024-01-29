
var rows = document.getElementsByClassName("row");
var currentHour = parseInt(dayjs().format('H'));
var today = dayjs().format('MMM D, YYYY');

$('#currentDay').text(today);



Array.from(rows).forEach(row => {
    var
      rowIdString = row.id,
      rowHour;
    if (rowIdString) {
      rowHour = parseInt(rowIdString);
    }
    if (rowHour) {
      // Compares row id to current hour and sets color accordingly
      if (currentHour === rowHour) {
        setColor(row, "green");
      } else if ((currentHour < rowHour) && (currentHour > rowHour - 6)) {
        setColor(row, "red");
      } else if ((currentHour > rowHour) && (currentHour < rowHour + 6)) {
        setColor(row, "lightblue");
      } else {
        setColor(row, "lightblue");
      }
    }
  });
  
  function setColor(element, color) {
    element.style.backgroundColor = color;
  }
$(function () {
  $('.saveBtn').on('click', function() {
      var timeBlockId = $(this).closest('.time-block').attr('id');
      var userInput = $(this).siblings('.description').val();
      localStorage.setItem(timeBlockId, userInput);
  });
    $('.time-block').each(function() {
      var blockHour = parseInt($(this).attr('id'));
      $(this).removeClass('past present future');
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });

    $('.time-block').each(function() {
      var blockId = $(this).attr('id');
      var savedInput = localStorage.getItem(blockId);
      if (savedInput) {
        $(this).find('.description').val(savedInput);
      }
    });
    $('#currentDay').text(today);
  });
  