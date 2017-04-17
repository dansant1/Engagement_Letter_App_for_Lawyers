Slingshot.fileRestrictions( "Upload", {
  allowedFileTypes: [ "image/png", "image/jpeg"],
  maxSize: 1 * 1024 * 1024
})

Slingshot.createDirective( "Upload", Slingshot.S3Storage, {
  bucket: "engagement-letter-app",
  acl: "public-read",
  authorize() {
    let userFileCount = Signatures.find( { "userId": this.userId } ).count();
    return userFileCount < 3 ? true : false;
  },
  key( file ) {
    var user = Meteor.users.findOne( this.userId );
    return user.emails[0].address + "/" + file.name;
  }
})