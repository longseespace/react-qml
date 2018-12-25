fn main() {
    println!("cargo:rustc-link-search=framework=/usr/local/opt/qt5/Frameworks");
    println!("cargo:rustc-link-lib=c++");
}
