class Player {
    constructor(nickname, room, socket){
      this.id = socket.id
      let tempName = nickname
      this.nickname = tempName
      this.room = room
      this.team = 'undecided'
      this.role = 'guesser'
      this.timeout = 2100         // # of seconds until kicked for afk (35min)
      this.afktimer = this.timeout
    }
  }