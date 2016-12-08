/**
 * Created by vuchien on 4/25/16.
 */

export function maskBody(level = 1) {
  var maskBodyId = document.getElementById("mask-body");
  maskBodyId.setAttribute("data-visible", "true");
  maskBodyId.setAttribute("data-level", level);
  var body = document.getElementsByTagName("body")[0];
  body.style.overflow = "hidden";
}

export function unMaskBody(id, level = 1) {
  var maskBodyId = document.getElementById("mask-body");
  if (level == 1) {
    // hide mask body
    maskBodyId.setAttribute("data-visible", "false");
    var body = document.getElementsByTagName("body")[0];
    body.style.overflow = "auto";
  }
  else {
    // downgrade level mask body
    maskBodyId.setAttribute('data-level', (level - 1) + "");
  }
  document.getElementById(id).style.display = "none";
}
export function unMaskBodyWithoutId(level = 1) {
  var maskBodyId = document.getElementById("mask-body");
  maskBodyId.setAttribute("data-visible", "false");
  var body = document.getElementsByTagName("body")[0];
  body.style.overflow = "auto";
}
