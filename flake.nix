{
  description = "Grafana test plugin";

  inputs = { nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-24.05"; };

  outputs = { self, nixpkgs }:
    with nixpkgs.legacyPackages.x86_64-linux; {
      devShell.x86_64-linux = mkShell { buildInputs = [ nodejs ]; };
    };
}
