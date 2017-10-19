// -----------------------------------------------------------------------------
// SAP UR Domain Relaxation
//
// Usage: ur_relax([integrated[, standalone[, maxrelax]]])
//
// Parameters: 
//   integrated: domain relaxation used, when application is started inside of
//               an iframe, a frameset or a popup window
//   standalone: domain relaxation used, when application runs standalone
//   maxrelax:   maximal relaxation, for "auto" and "maximal"
//
// Returns: true, if relaxation was successful
//          false, if an error occured, while doing relaxation
//
// Possible values for integrated/standalone:
//   "none"    : No domain relaxation will be done
//   "auto"    : Domain relaxation will automatically adapt to the parent window.
//               If no matching relaxation can be found, domain relaxation is 
//               "maximal". When running standalone this defaults to "minimal". 
//   "minimal" : Only the first part (hostname) of the domain will be removed
//   "maximal" : Remove as much as possible, without relaxing to TLD
//
// Possible value for maxrelax:
//   Integer, that determines the number of domain parts, that have to be kept.
//   E.g. 2 means "sap.com", 3 means "sub.sap.com" 
//
// Browser support: 
//   - Win 2000/XP IE6
//   - Win/Mac/Linux Firefox 1.0.x and 1.5
//
// There is a bug in Internet Explorer, that causes domain relaxation
// to fail intermittently, when the domain, where content is loaded from is
// the same as the relaxed domain of the parent
// (e.g. relaxed to wdf.sap.corp, iframe url http://wdf.sap.corp/....)
// -----------------------------------------------------------------------------

function ur_relax(integrated, standalone, maxrelax) {
  var hostname = location.hostname,
      nameparts = hostname.split("."),
      partslength = nameparts.length,
      reference = "parent";
  
  // if hostname is an ip address don't try to relax
  if (/^(\d|\.)+$/.test(hostname)) return true;

  // if hostname has no domain part don't relax
  if (partslength == 1) return true;
  
  // check and set defaults for parameters
  if (standalone == null) standalone = "minimal";
  if (integrated == null) integrated = "auto";
  if (maxrelax == null) maxrelax = 2;

  // enhance maxrelax in case hostname ends with dot
  if (nameparts[partslength - 1] == "") maxrelax += 1;

  // check if already reached maxrelax
  if (partslength <= maxrelax) return true;

  // determine method 
  if (standalone == "auto") standalone = "minimal";
  if (window[reference] == window) reference = "opener";
  if (window[reference] == null) method = standalone;
  else method = integrated;

  // apply method
  switch (method) {

    case "none": // no domain relaxing
      return true;
      break;
    
    case "auto": // try until correct one is found or maximal relaxation reached
      try {
        if (window[reference].location.href) return true;
      }
      catch (e) {};
      var testdomain;
      for (var i = 0; i <= partslength - maxrelax; i++) {
        testdomain = nameparts.slice(i).join(".");
        try {
          document.domain = testdomain;
          if (window[reference].location.href) return true;
        }
        catch (e) {};
      }
      return false;
      break;

    case "minimal": // only remove first (hostname) part of the domain
      try {
        document.domain = nameparts.slice(1).join(".");
        return true;
      }
      catch (e) {
        return false;
      }
      break;

    case "maximal": // relax as maximal possible/allowed
      try {
        document.domain = nameparts.slice(partslength - maxrelax).join(".");
        return true;
      }
      catch (e) {
        return false;
      }
      break;

    default:
      alert("Unknown relaxation method: " + method);
  }

  return false;
}


