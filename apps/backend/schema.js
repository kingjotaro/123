import mongoose from "mongoose";

const { Schema, model } = mongoose;

const drawerSchema = new Schema({
  name: String,
  nodes: [{ type: Schema.Types.Mixed }],
  edges: [{ type: Schema.Types.Mixed }]
});

const Drawer = mongoose.models.Drawer || model('Drawer', drawerSchema);

export default Drawer;
