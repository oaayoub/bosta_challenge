const ReservationModel = require("../models/reservations.model");
const BooksModel = require("../models/books.model");
const BooksService = require("./books.service");
const BorrowersService = require("./borrowers.service");
class Service {
  static async reserveBook(bookInfo, email) {
    console.log("🔖 reservationService bookInfo", bookInfo);
    console.log("🔖 reservationService email", email);
    const books = await BooksService.searchForBook(bookInfo);

    if (!books) {
      console.log("ReservationService ,Book not found ⁉⁉⁉");
      return null;
    }

    var book = books[0];
    console.log("🔖 reservationService book", book);
    if (book.available_quantity == 0) {
      console.log("🔖 reservationService cant reserve book⭕");
      return null;
    }

    book.available_quantity--;
    console.log("🔖 reservationService book after dec", book);
    const modifiedCols = { available_quantity: book.available_quantity };
    var updateStatus = await BooksModel.updateBook(book.isbn, modifiedCols);

    console.log("🔖 reservationService book updateStatus", updateStatus);
    //get borrower ID
    var borrowerInfo = await BorrowersService.searchBorrower(email);
    console.log("🔖 reservationService borrowerInfo:", borrowerInfo);

    if (borrowerInfo.length === 0) {
      console.log("no borrower with this mail");
      return null;
    }
    var borrower = borrowerInfo[0];

    let reservationStatus = await ReservationModel.reserveBook(
      book.isbn,
      borrower.uid
    );
    console.log("🔖 reservationService reservationStatus:", reservationStatus);
    return reservationStatus;
    //TODO : transactional procedure (all or nothing)
  }

  static async getAllReservations() {
    return await ReservationModel.getAllReservations();
  }

  static async getAllReservationsOfBorrower(email) {
    var borrowerInfo = await BorrowersService.searchBorrower(email);
    console.log(
      "🔖 reservationService getAllReservationsOfBorrower:",
      borrowerInfo
    );

    if (borrowerInfo.length === 0) {
      console.log("no borrower with this mail");
      return null;
    }
    var borrower = borrowerInfo[0];
    return await ReservationModel.getAllReservationsOfBorrower(borrower.uid);
  }

  static async returnBook(ISBN,email) {
    var borrowerInfo = await BorrowersService.searchBorrower(email);
    console.log(
      "🔖 reservationService returnBook:",
      borrowerInfo
    );

    if (borrowerInfo.length === 0) {
      console.log("no borrower with this mail");
      return null;
    }
    console.log(
        "🔖 reservationService returnBook:",
        ISBN,
        email
      );
    var borrower = borrowerInfo[0];
    return await ReservationModel.returnBook(ISBN,borrower.uid);
  }
}

module.exports = Service;
