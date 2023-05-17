$(document).ready(function () {
     let display1Eq = "";
     let displayEq = "";
     let isOperator = false;

     const updateDisplay1 = ({ input = "", type = "add" }) => {
          if (type == "add") {
               display1Eq += input;
               $("#display1").val(display1Eq);
          } else if (type == "clear") {
               display1Eq = "";
               $("#display1").val("0");
          } else if (type == "anew") {
               console.log(display1Eq, 1);
               if (input != "-") {
                    display1Eq = /[+\-*/]$/.test(display1Eq)
                         ? display1Eq.replace(/[^\d]+$/, "")
                         : display1Eq;
               }
               console.log(display1Eq, 2);

               display1Eq += input;
               console.log(display1Eq, 3);
               $("#display1").val(display1Eq);
          } else if (type == "equal") {
               display1Eq = input;
               $("#display1").val(input);
          }
     };
     const updatedisplay = ({ input = "", type = "add" }) => {
          if (type == "add") {
               $("#display").val((displayEq += input));
          } else if (type == "anew") {
               displayEq = "" + input;
               $("#display").val(displayEq);
               isOperator = true;
          } else if (type == "equal") {
               displayEq = "";
               $("#display").val(input);
          } else if (type == "clear") {
               displayEq = "";
               $("#display").val("0");
          }
     };

     // Handle number button clicks
     $(".numbers").click(function () {
          let input = $(this).text();
          if (displayEq.length == 1) {
               if (displayEq[0] != 0 || input != 0) {
                    updateDisplay1({ input });
                    updatedisplay({ input });
               }
          } else if (
               displayEq[0] == "+" ||
               displayEq[0] == "-" ||
               displayEq[0] == "*" ||
               displayEq[0] == "/"
          ) {
               if (displayEq[1] != 0 || input != 0) {
                    updateDisplay1({ input });
                    updatedisplay({ input });
               }
          } else {
               updateDisplay1({ input });
               updatedisplay({ input });
          }
     });

     // Handle operator button clicks
     $(".operators").click(function () {
          let input = $(this).text();
          isOperator = true;
          updatedisplay({ input, type: "anew" });
          updateDisplay1({ input, type: "anew" });
     });

     $("#decimal").click(function () {
          if (!displayEq.includes(".")) {
               if (
                    displayEq.length == 0 ||
                    (isOperator && displayEq.length == 1)
               ) {
                    updateDisplay1({ input: "0." });
                    updatedisplay({ input: "0." });
               } else {
                    updateDisplay1({ input: "." });
                    updatedisplay({ input: "." });
               }
          }
     });
     $("#clear").click(function () {
          isOperator = false;
          updateDisplay1({ type: "clear" });
          updatedisplay({ type: "clear" });
     });

     // Handle equals button click
     $("#equals").click(function () {
          isOperator = false;
          let result = eval(display1Eq);
          updateDisplay1({ input: result, type: "equal" });
          updatedisplay({ input: result, type: "equal" });
     });
});
