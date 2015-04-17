// JavaScript Document // Cfurku Jan-2014 //
// Reedited and linted by VZ - 2015

var newLines = 1;
var isComm = -1;
var isfunc = 0;
var inspace = '    ';
var inspace2 = '  ';

function brutify(source) {
  "use strict"

  if (newLines > 0) {
    if (newLines === 1) {
      source = source.replace(/^\s*\n/gm, '\n');

    }
    if (newLines > 1) {
      var source2 = source.split('\n');
      var s = 0;
      var source3 = '';
      for (var n = 0; n < source2.length; n++) {
        if (source2[n] === '') {
          if (s < newLines) {
            source3 += source2[n] + '\n';
          }
          s += 1;
        } else {
          s = 0;
          source3 += source2[n] + '\n';
        }
      }
      source = source3;
    }
  }

  var gjith = '';
  var lines = source.split("\n");
  for (var i in lines) {
    var line = lines[i];
    line = line.replace(/^\s+|\s+$/g, '');
    gjith += '' + line + '\n';

  }

  //-------create-hierarchy---------------------//

  gjith = gjith.split("\n");
  var gjith2 = '';
  var space = '';
  var kaswitch = 0;
  var kacase = 0;
  var kaof = 0;
  isComm = -1;
  var comm_pos = -1;
  for (var j = 0; j < gjith.length; j++) { // in gjith) {
    var line2 = gjith[j];

    if (line2.indexOf('%') > -1) { //------------------gjetja-e-komenteve----------------//

      comm_pos = findComm(line2);
      isComm = findComm(line2);

      var ccom_para = line2.substr(0, comm_pos);
      if (line2.indexOf('\'') < 0 && line2.indexOf('"') < 0) {
        ccom_para = replaces(ccom_para);
      }
      comm_pos = findComm(line2);
      if (comm_pos > 0) {
        line2 = ccom_para.trim() + ' ' + line2.substr(comm_pos).trim();
      }
      //else
      //line2 = line2.substr(0, comm_pos) + line2.substr(comm_pos);
      comm_pos = findComm(line2);
      isComm = findComm(line2);

      var spkot = ' ' /* TO FIX */

      line2 = line2.substr(0, comm_pos + 1) + spkot + line2.substr(comm_pos + 1);
    }
    var str_para
    var str_pas
      //---------------------------------------
    if (line2.indexOf('\'') > -1) {
      //-----------------------------gjej-stringjet---------apostrofa-tek-----------//
      isComm = findComm(line2);
      if (isComm >= 0) {
        str_para = line2.substr(0, isComm);
        str_pas = line2.substr(isComm);
      } else {
        str_para = line2;
        str_pas = '';
      }
      var ap_arr = str_para.split('\'');
      var str_arr = [];
      for (var apn = 0; apn < ap_arr.length; apn++) {
        if (apn % 2 === 0) {
          // --jasht-stringut-----------------//
          var mstr = ap_arr[apn];
          if (mstr.indexOf('"') < 0) {
            mstr = replaces(mstr);
          } else {
            if (apn > 0) {
              var mstr_para = mstr.substr(0, mstr.indexOf('"'));
              var mstr_pas = mstr.substr(mstr.indexOf('"'));
              mstr = replaces(mstr_para) + mstr_pas;
            }
          }
          str_arr.push(mstr);
        } else {
          // --brenda-stringut---------------//
          str_arr.push(ap_arr[apn]);
        }
      }
      str_para = str_arr.join('\'');
      line2 = str_para + str_pas;

      isComm = findComm(line2);
      comm_pos = findComm(line2);
    }

    if (line2.indexOf('"') > -1) {
      isComm = findComm(line2);
      if (isComm >= 0) {
        str_para = line2.substr(0, isComm);
        str_pas = line2.substr(isComm);
      } else {
        str_para = line2;
        str_pas = '';
      }
      ap_arr = str_para.split('"');
      str_arr = []
      for (apn = 0; apn < ap_arr.length; apn++) {
        if (apn % 2 === 0) {
          mstr = ap_arr[apn];
          if (mstr.indexOf("'") < 0) {
            mstr = replaces(mstr);
          } else {
            if (apn > 0) {
              mstr_para = mstr.substr(0, mstr.indexOf("'"));
              mstr_pas = mstr.substr(mstr.indexOf("'"));
              mstr = replaces(mstr_para) + mstr_pas;
            }
          }
          str_arr.push(mstr);
        } else {
          str_arr.push(ap_arr[apn]);
        }
      }
      str_para = str_arr.join('"');
      line2 = str_para + str_pas;

      isComm = findComm(line2);
      comm_pos = findComm(line2);
    }


    if (line2.indexOf('%') < 0 && line2.indexOf('\'') < 0 && line2.indexOf('"') < 0) {
      line2 = replaces(line2);
    }
    //-----------------------------------------------
    if (line2.indexOf('function') === 0) {
      isfunc = space.length;
    }

    if (line2.indexOf('function') === 0 || line2.indexOf('for ') === 0 || line2.indexOf('if ') === 0 || line2.indexOf('switch') === 0 || line2.indexOf('begin') === 0 || line2.indexOf('while') === 0 || line2.indexOf('classdef') === 0 || line2.indexOf('properties') === 0 || line2.indexOf('methods') === 0 || line2.indexOf('events') === 0 || line2.indexOf('try') === 0) {
      if (line2.indexOf('switch') === 0) {
        kaswitch = 1;
      }

      if (line2.indexOf('function') === 0) {
        gjith2 += space + line2 + "\n";
      } else {
        gjith2 += space + line2 + "\n";
        space += inspace; //
      }
    } else if (line2.indexOf('case ') === 0) { // case of CASE //---------
      if (kacase === 0) {
        gjith2 += space + line2 + "\n";
        kacase = 1;
        if (kaswitch === 1) {
          space += inspace;
        } else {
          space += inspace2;
        }
      } else {
        if (kaswitch === 1) {
          space = space.replace(inspace, '');
          gjith2 += space + line2 + "\n";
          space += inspace;
        } else {
          space = space.replace(inspace2, '');
          gjith2 += space + line2 + "\n";
          space += inspace2;
        }
      }
    } else if (line2.indexOf('of ') === 0) { // state of OF //---------
      if (kaof === 0) {
        gjith2 += space + line2 + "\n";
        space += inspace2;
        kaof = 1;
      } else {
        space = space.replace(inspace2, '');
        gjith2 += space + line2 + "\n";
        space += inspace2;
      }
    } else {
      if (line2.indexOf('end_case') === 0) {
        space = space.replace(inspace2, '');
        space = space.replace(inspace2, '');
        gjith2 += space + line2 + "\n";
        kaof = 0;
        kacase = 0;
      } else if (line2.indexOf('end_proc') === 0) {
        space = space.replace(inspace, '');
        gjith2 += space + line2 + "\n";
      } else if (line2.indexOf('end') === 0) {
        if (kaswitch === 1) {
          space = space.replace(inspace, '');
        }
        if (space.length === isfunc) {
          gjith2 += space + line2 + "\n";
          isfunc -= inspace.length;
        } else {
          space = space.replace(inspace, '');
          gjith2 += space + line2 + "\n";
          kacase = 0;
          kaswitch = 0;
        }
      } else if (line2.indexOf('else') === 0) {
        space = space.replace(inspace, '');
        gjith2 += space + line2 + "\n";
        space += inspace;
      } else if (line2.indexOf('catch') === 0) {
        space = space.replace(inspace, '');
        gjith2 += space + line2 + "\n";
        space += inspace;
      } else if (line2.indexOf('otherwise') === 0) {
        if (kaswitch === 1) {
          space = space.replace(inspace, '');
          gjith2 += space + line2 + "\n";
          space += inspace;
        } else {

          space = space.replace(inspace2, '');
          gjith2 += space + line2 + "\n";
          space += inspace2;
        }
      } else {
        gjith2 += space + line2 + "\n";
      }
    }

    if (line2.indexOf('...') > -1) { // if lines break with '...'
      if (isComm > -1) {
        if (line2.indexOf('...') < isComm) {
          gjith2 = gjith2 + '  ';
        }
      } else {
        gjith2 = gjith2 + '  ';
      }
    }
  }

  gjith2 = gjith2.replace(/  \n/g, '\n');
  gjith2 = gjith2.replace(/ \n/g, '\n');
  return gjith2
}

function findComm(line) {
  "use strict"
  if (line.indexOf('%') > -1) {
    var ddfill = 0;
    var ddcop;
    for (var k = 0; k < line.match(/\%/g).length; k++) {
      var ddpara = line.substr(0, line.indexOf('%', ddfill)) || '';
      if (ddpara.indexOf('\'') > -1) {
        ddcop = ddpara.match(/\'/g).length;
      } else {
        ddcop = 0;
      }
      if (ddcop === 0 || ddcop % 2 === 0) {
        var retComm = line.indexOf('%', ddfill);
        break;
      }
      ddfill = line.indexOf('%', ddfill) + 1;
    }
  } else {
    retComm = (-1);
  }
  return retComm;
}

function fix(val, symb) {
  "use strict"
  /*var separators = ['+', '-', '~~', '/', '\\', '=', '<', '>', '*'];
  var result = "";
  flag = true;
  for (var i = 0; i < val.length; i++) {
     flag = true;
     for (var j = 0; j < separators.length; j++) {
        if (val[i] ===separators[j]) {
            result += " " + val[i] + " ";
            flag = false;
        }
     }
     if (flag) {
         result += val[i];
     }
  }*/

  var main_arr = val.split(symb);
  var new_arr = [];
  for (var i in main_arr) {
    new_arr.push(main_arr[i].replace(/\s+/g, ' '));
  }
  var result2 = new_arr.join(' ' + symb + ' ');

  return result2;
}

function replaces(data) {
  "use strict"

  data = data.replace(/\s+/g, ' ');
  data = fix(data, '+');
  data = fix(data, '-');
  data = fix(data, '*');
  data = fix(data, '/');
  data = fix(data, '\\');
  data = fix(data, '=');
  data = fix(data, '<');
  data = fix(data, '>');
  data = fix(data, '~');
  data = fix(data, '&');
  data = fix(data, '|');
  data = fix(data, '^');
  data = fix(data, ',');
  data = fix(data, ';');

  data = data.replace(/\. \*/g, '.*');
  data = fix(data, '.*');
  data = data.replace(/\. \^/g, '.^');
  data = fix(data, '.^');
  data = data.replace(/\. \//g, './');
  data = fix(data, './');
  data = data.replace(/\. \\/g, '.\\');
  data = fix(data, '.\\');
  data = data.replace(/\~ \=/g, '~=');
  data = fix(data, '~=');

  data = data.replace(/\s+/g, ' ');

  data = data.replace(/= =/g, '==');
  data = data.replace(/< =/g, '<=');
  data = data.replace(/> =/g, '>=');
  data = data.replace(/\+ \=/g, '+=');
  data = data.replace(/\- \=/g, '-=');
  data = data.replace(/\& \&/g, '&&');
  data = data.replace(/\| \|/g, '||');
  data = data.replace(/ \, /g, ', ');
  data = data.replace(/ \; /g, '; ');

  data = data.replace(/ \)/g, ')');
  data = data.replace(/ \]/g, ']');
  data = data.replace(/ \}/g, '}');
  data = data.replace(/\( /g, '(');
  data = data.replace(/\[ /g, '[');
  data = data.replace(/\{ /g, '{');

  data = data.replace('if(', 'if (');
  data = data.replace('while(', 'while (');

  data = data.replace(/\( \)/g, '()');
  data = data.replace(/\[ \]/g, '[]');
  data = data.replace(/\{ \}/g, '{}'); // jo e nevojshme //
  data = data.replace(/\^ - /g, '^ -'); // experimental //

  return data;
}

module.exports = brutify