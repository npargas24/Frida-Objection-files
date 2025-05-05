Prereqs (with all the prereqs each of them have):
Frida:
https://frida.re/ 
 
Frida-server:
frida-server-16.7.14-android-arm64.xz

Objection:
https://github.com/sensepost/objection 

Step 1: Download command line tools for Android
https://developer.android.com/studio#command-line-tools-only

Step 2: Have a rooted emulator device
Download rootAVD: 
https://github.com/newbit1/rootAVD

Get 12(S) for arm64 mac:
https://github.com/newbit1/rootAVD/blob/master/CompatibilityChart.md

Download 12(S) for ARM64 system image in Android Studio (version 28)

Open Emulator: 
~/Library/Android/sdk/emulator/emulator -list-avds
~/Library/Android/sdk/emulator/emulator -avd <AVD_NAME>

Run in rootAVD directory (cd rootAVD):
./rootAVD.sh
./rootAVD.sh ListAllAVDs
./rootAVD.sh system-images/android-28/default/arm64-v8a/ramdisk.img

The emulator should close, upon restarting it should restart like normal. If there’s a grey or black screen then it’s wrong.

 Run: adb shell 
If it connects then it’s working. If it fails it’ll have a failure to connect error.
Run: su
Run: whoami
Should return: root

In another terminal run: 
objection -g com.loreal.ysl.perso.lips explore 
It should connect!

Step 3: Run the Frida Server
Open another terminal
Navigate to the directory where frida-server is installed
Run:
chmod +x frida-server-16.7.14-android-arm64
adb push frida-server-16.7.14-android-arm64 /data/local/tmp/frida-server
adb shell
su
./frida-server &
If it returns a number then it was successful!


For replacing a string:
Step 1: Find the string you want to replace and get the hex for it
Run: echo -n "No activities yet" | xxd -p
Copy the hex output
Step 2: Find it in memory
Run: memory search 4e6f206163746976697469657320796574
Step 3: Find a replacement string
echo -n "Natalie activities" | xxd -p
Copy the hex output
Step 4: Get the pid of the app
adb shell pidof com.loreal.ysl.perso.lips
Step 5: Run the script to replace the string using frida
frida -U -p <pid from pidof> -l replace_textview.js
Frida might give an input error for a missing semicolon. It’s stupid. Go to the app emulation and find the “No activities yet” text anyways. It should replace it once it loads in!

