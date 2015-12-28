---
layout: post
title:  "SVG Patterns"
date:   2015-07-15
---
<head>
  <style>
  .title {
  margin-left: 25%;
  margin-right: 25%;
  font-family: "Lucida Grande";
  margin-top: 40px;
  color: black;
  }
  svg {
  box-shadow: 0px 0px 10px #888888;
  margin-top: 5px;
  /*margin-left: 25%;*/
  width: 100%;
  position: relative;
  }
  input {
  font-family: "Lucida Grande";
  position: relative;
  margin-left: 40%;
  width: 20%;
  height:50px;
  font-size:14pt;
  text-align: center;
  }
  </style>
  <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js"></script>
</head>
<body>
  <p>Playing with SVG patterns.  This creates a random pattern from the input text by hashing the text.
  </p>
  <svg id="svg" style="width:100%;height:100%;">
    <defs id="defs">
    <pattern id="pats" x="0" y="0" width="20" height="20" viewBox="0 0 9 9" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="1" fill="red" />
    </pattern>
    </defs>
    <rect id="canvas" fill="url(#pats)" stroke="black" stroke-width="5" style="width:100%;height:100%;" />
  </svg>
  <script src="{{ "/js/patterns.js" | prepend: site.baseurl }}"></script>
  <input type="text" name="fname" value="change me" onkeydown="update(this.value)" onclick="this.value='';" onfocus="this.select()">
</body>