const {LaundryRoom} = require("../models/laundryroom");
const {Announcement} = require("../models/laundryroom");

const list = async (req, res) => {
    try {
        // get all announcements in database
        let announcements = await Announcement.find({}).exec();

        return res.status(200).json(announcements);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

// Give the laundryRoomId as req.body
const listInRoom = async (req, res) => {
    try {
        console.log(req.query.id)
        let room = await LaundryRoom.findById(req.body.laundryRoomId).exec();
        let announcements_list = room.announcements;
        console.log("Getting all announcements of the room.");
        let announcements = []
        for(let a_id of announcements_list){
            let m = await Announcement.findById(a_id).exec();
            announcements.push(m);
        }

        return res.status(200).json(announcements);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const read = async (req, res) => {
    try {
        let announcement = await Announcement.findById(req.params.id).exec();

        if (!announcement)
            return res.status(404).json({
                error: "Not Found",
                message: `Announcement not found`,
            });

        return res.status(200).json(announcement);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const create = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    // handle the request
    try {
        try {
            if (req.body.laundryRoomId == null) {
                console.log("RoomID Announcement belongs to must be given!");
                return res.status(500).json({
                    error: "RoomID Announcement belongs to must be given!",
                    message: "RoomID Announcement belongs to must be given!",
                });
            }

            let laundryRoom = await LaundryRoom.findById(req.body.laundryRoomId).exec();

            if (laundryRoom == null) {
                console.log("RoomID Announcement belongs to does not exist!");
                return res.status(500).json({
                    error: "RoomID Announcement belongs to does not exist!",
                    message: "RoomID Announcement belongs to does not exist!",
                });
            }
        } catch {}

        let data = {
            "title": req.body.title,
            "body": req.body.body
        }
        let ann = await Announcement.create(data);
        let added_laundryroom = await LaundryRoom.findOneAndUpdate(
            {_id: req.body.laundryRoomId},
            {$push: {announcements: ann}});

        console.log("ADDED ANNOUNCEMENT TO LAUNDRY ROOM");
        console.log(added_laundryroom);


        // create machine in database
        return res.status(201).json(ann);

    } catch
        (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }


};

const update = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    }

    // handle the request
    try {
        let announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).exec();

        return res.status(200).json(announcement);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const remove = async (req, res) => {
    try {
        // find and remove LaundryRoom
        await Announcement.findByIdAndRemove(req.params.id).exec();

        return res
            .status(200)
            .json({message: `Announcement with id ${req.params.id} was deleted`});
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};


module.exports = {
    list,
    listInRoom,
    read,
    create,
    update,
    remove
};
