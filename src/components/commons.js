/**
 * Created by vuchien on 6/20/16.
 */
import * as views from './viewConstants';
import {maskBody, unMaskBodyWithoutId} from '../core/ui/modal';
import $ from 'jquery';
import
{
  classItemClickShowDropDown,
  itemClickToShowDropDownList,
  wrapperDropdownList,
  navigatorOptionsColumn,
  wrapperOptionsColumn
} from '../config';

export function menuActive(componentName) {
  switch (componentName) {
    case views.VIEW_CATEGORY:
      menuActiveHandling(views.VIEW_CATEGORY);
      break;
    case views.VIEW_PRODUCT:
      menuActiveHandling(views.VIEW_PRODUCT);
      break;
    case views.VIEW_DEFAULT:
      menuActiveHandling(views.VIEW_DEFAULT);
      break;
    case views.VIEW_STORE:
      menuActiveHandling(views.VIEW_STORE);
      break;
    case views.VIEW_CHANGE_PASSWORD:
      menuActiveHandling(views.VIEW_CHANGE_PASSWORD);
      break;
    default:
      break;
  }
}

export function timeFormat(timestamp) {
  "use strict";
  var d = new Date(timestamp);
  let AM_PM;

  var s = d.getSeconds();

  var m = d.getMinutes();

  var h = d.getHours();

  var day = d.getDay();

  var date = d.getDate();

  var month = d.getMonth();

  var year = d.getFullYear();

  var days = new Array("Chủ nhật", "Thứ hai", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7");

  var months = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12");
  var am_pm;

  if (s < 10) {
    s = "0" + s
  }

  if (m < 10) {
    m = "0" + m
  }

  // if (h > 12) {
  //     h -= 12;
  //     AM_PM = "PM"
  // }
  //
  // else {
  //     AM_PM = "AM"
  // }

  if (h < 10) {
    h = "0" + h
  }

  let result = date + "/" + months[month] + "/" + year + " " + h + ":" + m;

  return result;
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function guidShort() {
  return ("00000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-5).toUpperCase();
}

function menuActiveHandling(viewName) {
  let leftMenu = $("ul#left-menu");
  leftMenu.find("li").attr("data-active", "false");
  leftMenu.find("li#" + viewName).attr("data-active", "true");
}

export function ShowLoadingPanel(level = 1) {
  maskBody(level);
  $("#main-panel-loading").attr("data-show", "true");
}

export function HideLoadingPanel(level = 1) {
  unMaskBodyWithoutId();
  $("#main-panel-loading").attr("data-show", "false");
}

export function getDateTodayWithNoSpace() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear().toString().substr(2, 2);

  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = dd + '-' + mm + '-' + yyyy;
  return today;
}

export function getDateToday() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = dd + '-' + mm + '-' + yyyy;
  return today;
}

export function formatVND(money) {
  var moneyStrOnly = money.replace(/\./g, "");
  var value = moneyStrOnly.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return value;
}

export function hiddenDropdownSelectOutRangeClick(_this) {
  $('body').click(function (evt) {
    const obj = $(evt.target);
    if (obj.hasClass(classItemClickShowDropDown)) {
      return;
    }
    _this.hideWrapperExtra();
  });
}

/*******************************************************************/
/**
 * Dropdown list options column editor
 */
export function reShowDropWhenUpDownItem(id) {
  // hide all navigator state and drop down
  $("." + wrapperOptionsColumn).hide();
  $("." + navigatorOptionsColumn).attr("data-active", "false");
  // show drop down with last id moved
  $("#" + id).attr("data-active", "true").next("." + wrapperOptionsColumn).show();
}
/*******************************************************************/


let storeStateSelect = [];
export function storeStateSelectBox(thisObject) {
  flushAllStoreStateSelect(()=> { // this todo in callback, callback type es6, if need to pass a param: eg: (result) =>, or result =>
    if (storeStateSelect.length == 0) { // first time
      storeStateSelect.push(
        {
          thisObj: thisObject
        }
      );
    } else {
      if (__DEV__) {
        console.log("run to else");
      }
    }
  });
}

function flushAllStoreStateSelect(handler) {
  if (storeStateSelect.length > 0) {
    for (let item of storeStateSelect) {
      item.thisObj.hideWrapperExtra();
    }
    storeStateSelect = [];
    handler();
  } else {
    handler();
  }
}

/**
 * Check extension name image mine type
 * @param mineType
 * @returns {*}
 */
export const checkMineTypeImage = (mineType) => {
  let extendType;
  switch (mineType) {
    case "image/jpeg":
      extendType = ".jpg";
      break;
    case "image/png":
      extendType = ".png";
      break;
    default:
      extendType = ".jpeg";
      break;
  }
  return extendType;
};
