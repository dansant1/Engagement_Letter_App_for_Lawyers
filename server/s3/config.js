// SIGNATURES
Slingshot.fileRestrictions( "Upload", {
  allowedFileTypes: [ "image/png", "image/jpeg"],
  maxSize: 1 * 1024 * 1024
})

Slingshot.createDirective( "Upload", Slingshot.S3Storage, {
  bucket: "engagement-letter-app",
  acl: "public-read",
  authorize() {
    let userFileCount = Signatures.find( { "userId": this.userId } ).count();
    return userFileCount <= 1 ? true : false;
  },
  key( file ) {
    var user = Meteor.users.findOne( this.userId );
    return user.emails[0].address + "/" + file.name;
  }
})

// LOGOS
Slingshot.fileRestrictions( "UploadLogos", {
  allowedFileTypes: [ "image/png", "image/jpeg"],
  maxSize: 1 * 1024 * 1024
})

Slingshot.createDirective( "UploadLogos", Slingshot.S3Storage, {
  bucket: "engagement-letter-app",
  acl: "public-read",
  authorize() {
   
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    let userFileCount = Logos.find( { firmId  } ).count();
    return userFileCount <= 1 ? true : false;
  },
  key( file ) {
    let firmId =  Meteor.users.findOne({_id: this.userId}).profile.firmId
    return firmId + "/" + file.name;
  }
})

// Signatures of Clients
Slingshot.fileRestrictions( "UploadSignatureOfClient", {
  allowedFileTypes: [ "image/png", "image/jpeg"],
  maxSize: 1 * 1024 * 1024
})

Slingshot.createDirective( "UploadSignatureOfClient", Slingshot.S3Storage, {
  bucket: "engagement-letter-app",
  acl: "public-read",
  authorize(file, client) {
    
    return  true 

  },
  key( file, client ) {
  
    let client_email = Clients.findOne({_id: client._id}).company_client_email;
    return client_email + "/" + file.name;
  }
})

