#!/usr/bin/perl
use warnings;
use strict;

print "No args required! Ignoring arguments\n" if @ARGV > 0;

# naming all files
my $companiesFile = "companies.txt";
my $searchOutput = "searchTiming.txt";
my $authOutput = "authTiming.txt";
my $finalResults = "timingResults.txt";
my $numAuthTests = 100;

# Open input file, clear/create output file
my $newsTopicsFile = "newstopics.txt";
open my $fh, "<", $newsTopicsFile or die "Could not open input file $newsTopicsFile\n";

#Auth speed tests, and get token from final test
print "Setup Complete.\nTesting Auth...\n";
print " Completed: \n";
for (my $i=0; $i < $numAuthTests; $i++) {
    `/usr/bin/time --append --output=$authOutput curl --request POST --url http://api.restfulnews.com/auth --header 'content-type: application/json' --data '{ "email": "steven\@restfulnews.com", "password": "accident8" }' 2>/dev/null`;
    print (sprintf "    %02d/%03d\n", $i + 1, $numAuthTests);
    sleep 1;
}
print "\nCompleted Auth timing tests. Sleeping to allow server a rest\n";
for (my $i=1; $i < 5; $i++) {
    print "$i/5\n";
    sleep 1;
}

my $token = `curl --request POST --url http://api.restfulnews.com/auth --header 'content-type: application/json' --data '{ "email": "steven\@restfulnews.com", "password": "accident8" }' 2>/dev/null`;
$token =~ s/^.+token\":\"(.*?)\".*$/$1/;
die "Invalid token\n" if $token =~ /[\[\{\]\}]\"/;
print "User Authenticated, token received.\nTesting Searching...\n";

# Search for every word in the input file as a separate topic
my $i = 0;
print "    Searches made:\n";
foreach my $line (<$fh>) {
    my @words = split(/[ ,\.\/]/, $line);
    foreach my $topic (@words) {
        chomp $topic;
        my $url = "http://api.restfulnews.com/search?topics=";
        $url .= $topic;
        open my $companies, "<", $companiesFile or die "Couldn't open $companiesFile\n";
        foreach my $company (<$companies>) {
            $company =~s/\r//;
            chomp $company;
            my $fullurl = $url;
            $fullurl .= "&companyids=$company";
            $fullurl =~s/\r//;
            chomp $fullurl;
            $fullurl =~ s/[^\w&\:\/\.\?\=]//;
            $fullurl = lc $fullurl;
            `/usr/bin/time --append --output=$searchOutput curl --request GET --url '$fullurl' --header 'authorization: Bearer $token' --header 'content-type: application/json' 2>/dev/null`;
            $i++;
            print (sprintf "        %03d/336\n", $i);
        }
    }
}
close $fh;
close $searchOutput;

# collate auth $results
open my $results, "<", $authOutput or die "Failed to open Auth timing results\n";
my $authTime = 0;
$numAuthTests = 0;
my $minAuthTime;
my $maxAuthTime = 0;
foreach my $line (<$results>) {
    if ($line =~ /user.*system.*elapsed/) {
        $line =~ s/^.*(\d+:\d+\.\d+)elapsed.*$/$1/;
        my $min = $line;
        $min =~ s/(\d+):.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.*:(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $authTime += $min + $sec;
        if (!defined $minAuthTime) {
            $minAuthTime = $sec;
        } elsif ($sec < $minAuthTime) {
            $minAuthTime = $sec;
        }
        if ($sec > $maxAuthTime) {
            $maxAuthTime = $sec;
        }
        $numAuthTests++;
    }
}

# Collate timing results
my $minSearchTime;
my $maxSearchTime = 0;
open my $searchresults, "<", "$searchOutput" or die "Failed to open Search timing results\n";
my $totalSecs = 0;
my $numSearches = 0;
foreach my $line (<$searchresults>) {
    if ($line =~ /user.*system.*elapsed/) {
        $line =~ s/^.*(\d+:\d+\.\d+)elapsed.*$/$1/;
        my $min = $line;
        $min =~ s/(\d+):.+$/$1/;
        $min = $min * 60;
        my $sec = $line;
        $sec =~ s/^.*:(\d+.\d+).*$/$1/;
        $sec = $sec + 0;
        $totalSecs += $min + $sec;
        if (!defined $minSearchTime) {
            $minSearchTime = $sec;
        } elsif ($sec < $minSearchTime) {
            $minSearchTime = $sec;
        }
        if ($sec > $maxSearchTime) {
            $maxSearchTime = $sec;
        }
        $numSearches++;
    }
}
close $results;

die "===\nMassive error: No timing data reported\n===\n" if $numSearches == 0;

`echo "" > $finalResults`;
open my $frhandler, ">>", $finalResults or die "Could not open final results file\n";
printf $frhandler "Auth time:\n%.2f seconds, $numAuthTests test case\n", $authTime/$numAuthTests;
printf $frhandler "Max Auth time:\n%.2f seconds\n", $maxAuthTime;
printf $frhandler "Min Auth time:\n%.2f seconds\n", $minAuthTime;
print "\n";
printf $frhandler "Average Search time:\n%.2f seconds, $numSearches test cases\n", $totalSecs/$numSearches;
printf $frhandler "Max Search time:\n%.2f seconds\n", $maxSearchTime;
printf $frhandler "Min Search time:\n%.2f seconds\n", $minSearchTime;
close $frhandler;

`rm GLOB* $searchOutput $authOutput 2>/dev/null`;
print "All cleaned up!\n";
`clear`;
print "\n======================================\n";
print "=  Results are in $finalResults  =\n";
print "======================================\n\n";
