Java.perform(function () {
    var TextView = Java.use("android.widget.TextView");

    // Hooking setText method to intercept the original text
    TextView.setText.overload("java.lang.CharSequence").implementation = function (text) {
        console.log("Original text:", text.toString());

        if (text != null && text.toString().includes("No activities yet")) {
            console.log("Replacing text:", text.toString(), "→ Natalie activities");
            // Replace the original text with "Natalie activities"
            text = Java.use("java.lang.String").$new("Natalie activities");
        }

        return this.setText(text);
    };
});
