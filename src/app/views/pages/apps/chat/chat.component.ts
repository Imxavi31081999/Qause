import { Component, OnInit, AfterViewInit } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import * as io from "socket.io-client";
import { ProfileService } from "src/app/core/services/profile.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";

const SOCKET_ENDPOINT = "http://qause.online:3000";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit, AfterViewInit {
  defaultNavActiveId = 1;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  showMobile = false;
  userId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService
  ) {
    if (this.router.getCurrentNavigation() != null) {
      this.userId = this.router.getCurrentNavigation().extras.state.ngoId;
    } else {
      alert("no ngo is selected");
    }
  }

  ngOnInit(): void {
    const mediaQuery = window.matchMedia("(max-width: 992px)");
    // Check if the media query is true
    if (mediaQuery.matches) {
      // Then trigger an alert
      // alert("Media Query Matched!");
      this.showMobile = true;
    }

    // chat connection

    this.route.queryParams.subscribe((params) => {
      // this.userType = params.username;
      // this.room = params.room;
      // if (this.userType === "ngo") {
      //   this.userId = this.volunteerId;
      // }
      // if (this.userType === "volunteer") {
      //   this.userId = this.ngoId;
      // }
      if (this.profileService.getUserId()) {
        // this.userId = this.profileService.getUserId();

        // ngoId
        // userId Will Contain ngoId, since the token is of volunterr
        // this.userId = "dsfadsf";
        console.log("userId = ", this.userId);
      } else {
        this.profileService.getUserProfileDetails().subscribe(
          (res: any) => {
            this.userId = res.data._id;
            console.log("userId = ", this.userId);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });

    this.setupSocketConnection();
    this.route.queryParams.subscribe((params) => {
      this.socket.emit("joinRoom", {
        type: this.chatTypes[0],
        users: [this.userId],
      });

      // on chat initiated
      this.socket.on(
        "chatInitiated",
        ({ roomId, message }: { roomId: string; message: string }) => {
          console.log("onChatInitiated:: ", roomId, message);
          this.chatRoomId = roomId;
        }
      );

      // broadCastMessage from server
      this.socket.on("broadCastMessage", (message: any) => {
        console.log("broadCastMessage: ", message);
      });

      // Get previous chat
      this.socket.on("previousChat", (recentChats: any) => {
        console.log("recentChat:: ", recentChats);
        this.recentChats = recentChats;
      });

      // On disconnect
      this.socket.on("removeUser", ({ userId }: { userId: string }) => {
        console.log("disconnect:: ", userId);
      });
    });

    // Remove user from chat list
    this.socket.on("removeUser", ({ userId }: { userId: string }) => {
      this.users = this.users.filter((user) => user.userId != userId);
    });

    // Typing from server
    this.socket.on(
      "onTyping",
      ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
        console.log("onTyping:: ", userId, isTyping);
      }
    );

    // Message
    this.socket.on("message", (message: any) => {
      this.messages.push(message);
    });
  }

  ngAfterViewInit(): void {
    this.resizeObservable$ = fromEvent(window, "resize");
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      // console.log("event: ", evt);
      const mediaQuery = window.matchMedia("(max-width: 992px)");
      // Check if the media query is true
      if (mediaQuery.matches) {
        // Then trigger an alert
        // alert("Media Query Matched!");
        this.showMobile = true;
      } else {
        this.showMobile = false;
      }
    });

    // Show chat-content when clicking on chat-item for tablet and mobile devices
    document.querySelectorAll(".chat-list .chat-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        document.querySelector(".chat-content").classList.toggle("show");
      });
    });
  }

  // back to chat-list for tablet and mobile devices
  backToChatList() {
    document.querySelector(".chat-content").classList.toggle("show");
  }

  save() {
    console.log("passs");
  }

  // chat working
  // userType;
  // ngoToken;
  // volunteerToken;
  socket: any;
  message;
  chatRoomId;
  typing;
  timeout;
  messages: any[] = [];
  users;
  recentChats;
  // volunteerId;
  // ngoId;
  chatTypes: string[] = ["consumer-to-consumer", "consumer-to-support"];

  setupSocketConnection() {
    let token = this.authenticationService.getToken();
    token = token.data.token;
    console.log("token = ", token);

    // if (this.userType === "ngo") {
    //   token = this.ngoToken;
    // }
    // if (this.userType === "volunteer") {
    //   token = this.volunteerToken;
    // }

    this.socket = io.connect(SOCKET_ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
      query: { token },
    });
    console.log("connection setup");
  }

  onMessageSend() {
    console.log({
      messageType: "text",
      message: this.message,
      room: this.chatRoomId,
    });
    this.socket.emit("chatMessage", {
      messageType: "text",
      message: this.message,
      room: this.chatRoomId,
    });
    this.message = "";
  }
  onLeaveRoom() {
    const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
    if (leaveRoom) {
      this.router.navigate(["/"]);
    } else {
    }
  }
  timeouttimeoutFunction() {
    this.typing = false;
    this.socket.emit("typing", { typing: false, roomId: this.chatRoomId });
  }

  onChange() {
    if (this.typing == false) {
      this.typing = true;
      this.socket.emit("typing", { typing: true, roomId: this.chatRoomId });
      this.timeout = setTimeout(this.timeouttimeoutFunction.bind(this), 5000);
    } else {
      this.timeout = setTimeout(this.timeouttimeoutFunction.bind(this), 5000);
    }
  }
}
