{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [ pkgs.nodejs_20 pkgs.nodePackages.npm ];
  env = { };
  idx = {
    previews = {
      enable = true;
      previews = {
        "web" = {
          command = [ "npm" "run" "dev" "--" "-p" "3000" ];
          manager = "web";
        };
      };
    };
  };
  idx.workspace.onCreate = ''
    cd frontend
    npm install
  '';
  idx.workspace.onStart = ''
    cd frontend
    npm run dev -- -p 3000
  '';
}
