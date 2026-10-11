const nav=document.getElementById("nav"),toggle=document.getElementById("menuToggle");
toggle.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const filters=document.querySelectorAll(".filter"), cards=document.querySelectorAll(".food-card");
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active")); btn.classList.add("active");
  const f=btn.dataset.filter;
  cards.forEach(c=>c.style.display=(f==="all"||c.dataset.category===f)?"grid":"none");
}));

let cart=[];
const panel=document.getElementById("cartPanel"),overlay=document.getElementById("overlay");
function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const box=document.getElementById("cartItems");
  box.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-row"><span>${x.name}</span><b>₹${x.price}</b></div>`).join(""):"<p style='color:#756d66'>Your cart is empty. Add something delicious.</p>";
  document.getElementById("cartTotal").textContent="₹"+cart.reduce((s,x)=>s+x.price,0);
}
document.querySelectorAll(".add").forEach(btn=>btn.addEventListener("click",()=>{
  cart.push({name:btn.dataset.name,price:Number(btn.dataset.price)}); renderCart();
  panel.classList.add("open"); overlay.classList.add("show");
}));
function closeCart(){panel.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartBtn").onclick=()=>{panel.classList.add("open");overlay.classList.add("show")};
document.getElementById("closeCart").onclick=closeCart; overlay.onclick=closeCart;
document.getElementById("checkout").onclick=()=>alert(cart.length?"Demo order created! Connect this button to your real ordering system later.":"Add an item first.");

document.getElementById("reservationForm").addEventListener("submit",e=>{
 e.preventDefault(); document.getElementById("formMessage").textContent=" Thanks! Demo reservation request received.";
 e.target.reset();
});
renderCart();